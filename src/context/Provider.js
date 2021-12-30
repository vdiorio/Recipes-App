import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from './ContextAPI';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import fetchDrinkAPI from '../helpers/FetchDrinkAPI';
import {
  saveRecipeInProgress, manageRecipeInProgress,
  saveFavoriteRecipes, removeFromFavoriteRecipes,
  saveDoneRecipes } from '../helpers/SaveLocalStorage';

const copy = require('clipboard-copy');

function Provider({ children }) {
  // const [isDisabled, setIsDisabled] = useState(true);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [showToast, setShowToast] = useState(
    <span className="copied-link">Link copiado!</span>,
  );
  const history = useHistory();
  const THREE_SECONDS = 3000;
  const MIN_INGREDIENTS = 9;
  const MAX_INGREDIENTS = 28;
  const MIN_DRINK_INGREDIENTS = 17;
  const MAX_DRINK_INGREDIENTS = 31;
  const MIN_MEASURES = 29;
  const MAX_MEASURES = 48;
  const MIN_DRINK_MEASURES = 32;
  const MAX_DRINK_MEASURES = 47;

  function shareRecipe() {
    copy(window.location.href);
    setShowToast(
      <span className="copied-link copied-link--active">Link copiado!</span>,
    );
    setTimeout(() => {
      setShowToast(
        <span className="copied-link">Link copiado!</span>,
      );
    }, THREE_SECONDS);
  }

  function handleFavorite(isFavorite, arrayOfHearts, setIsFavorite, obj) {
    if (isFavorite === arrayOfHearts[0]) {
      setIsFavorite(arrayOfHearts[1]);
      saveFavoriteRecipes(obj);
    }
    if (isFavorite === arrayOfHearts[1]) {
      setIsFavorite(arrayOfHearts[0]);
      removeFromFavoriteRecipes(obj);
    }
  }

  function requestRecipes(MAX_AMOUNT, requestLink) { // fetch para os cards de recomendacoes
    if (requestLink === 'meal') {
      fetchFoodAPI().then((response) => {
        setFoods(response.meals.filter((_item, i) => i < MAX_AMOUNT));
      });
    }
    if (requestLink === 'drink') {
      fetchDrinkAPI().then((response) => {
        setDrinks(response.drinks.filter((_item, i) => i < MAX_AMOUNT));
      });
    }
  }

  function selectedRange(MIN, MAX, arrayToBeFiltered) { // filtra os itens pertinentes dentro do objeto
    return arrayToBeFiltered.filter((_item, index) => (
      index >= MIN && index <= MAX
    ));
  }

  function getCurrentProgress() {
    const ingredients = Array.from(document.getElementsByClassName('ingredient-step'));
    const type = history.location.pathname.split('/')[1] === 'comidas'
      ? 'meals' : 'cocktails';
    const id = history.location.pathname.split('/')[2];
    const newArray = [];
    ingredients.forEach((item, index) => item.checked !== true && newArray.push(index));
    manageRecipeInProgress(newArray, type, id);
    ingredients.forEach((item) => (item.checked
      ? (item.parentElement.classList.add('ingredient-step--checked')
      ) : (
        item.parentElement.classList.remove('ingredient-step--checked'))));
  }

  function concatIngredientsAndMeasures( // une os ingredientes e medidas em uma string
    arrayOfData, RANGE, pageType, // arrayOfData corresponde aos arrays de ingredientes e medidas
  ) {
    const concatenated = [];
    for (let index = 0; index <= RANGE; index += 1) {
      if (arrayOfData[0][index] !== '' && arrayOfData[0][index] !== null) {
        concatenated.push(
          <li key={ `item${index}` }>
            {pageType === 'detail'
              ? (
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${
                    arrayOfData[0][index]} - ${
                    arrayOfData[1][index] === null
                      ? 'to your taste' : arrayOfData[1][index]}`}
                </p>
              ) : (
                <label htmlFor={ `${index}ingredient-step` }>
                  <input
                    type="checkbox"
                    data-testid={ `${index}-ingredient-step` }
                    className="ingredient-step"
                    id={ `${index}ingredient-step` }
                    onChange={ getCurrentProgress }
                  />
                  {`${
                    arrayOfData[0][index]} - ${
                    arrayOfData[1][index] === null
                      ? 'to your taste' : arrayOfData[1][index]} `}
                </label>
              )}
          </li>,
        );
      }
    }
    return (
      <ul>
        {concatenated}
      </ul>
    );
  }

  function ingredientsAndMeasures(obj, recipeType, pageType) { // responsavel pela selecao e juncao dos ingredientes e medidas
    const fullArray = Object.values(obj);
    if (recipeType === 'meals') {
      const MAX_RANGE = 19;
      const ingredientsOnly = selectedRange(MIN_INGREDIENTS, MAX_INGREDIENTS, fullArray);
      const measuresOnly = selectedRange(MIN_MEASURES, MAX_MEASURES, fullArray);
      return concatIngredientsAndMeasures(
        [ingredientsOnly, measuresOnly], MAX_RANGE, pageType,
      );
    }
    if (recipeType === 'cocktails') {
      const MAX_RANGE = 14;
      const ingredientsOnly = selectedRange(
        MIN_DRINK_INGREDIENTS, MAX_DRINK_INGREDIENTS, fullArray,
      );
      const measuresOnly = selectedRange(
        MIN_DRINK_MEASURES, MAX_DRINK_MEASURES, fullArray,
      );
      return concatIngredientsAndMeasures(
        [ingredientsOnly, measuresOnly], MAX_RANGE, pageType,
      );
    }
  }

  function ingredientsToNumbersArray(obj, type, id) { // converte os ingredientes da receita em numeros
    const fullArray = Object.values(obj);
    const savedInStorage = localStorage.getItem('inProgressRecipes');
    const newArray = [];
    let ingredientNumber = 0;
    const ingredientsOnly = type === 'meals'
      ? selectedRange(MIN_INGREDIENTS, MAX_INGREDIENTS, fullArray)
      : selectedRange(MIN_DRINK_INGREDIENTS, MAX_DRINK_INGREDIENTS, fullArray);
    for (let index = 0; index < ingredientsOnly.length; index += 1) {
      if (ingredientsOnly[index] !== '' && ingredientsOnly[index] !== null) {
        newArray.push(ingredientNumber);
        ingredientNumber += 1;
      }
    }
    if (savedInStorage === null
      || JSON.parse(savedInStorage)[type] === undefined
      || JSON.parse(savedInStorage)[type][id] === undefined) {
      return newArray;
    }
    return JSON.parse(savedInStorage)[type][id];
  }

  function linkToInProgress(newPath) { // direciona para tela de receita em progresso,
    // existe a possibilidade de flexibilizar esta funcao para atender outras paginas tambem como a pagina de login
    history.push(newPath);
  }

  function handleStartRecipe(pathName, type, id, ingredientsArray) {
    saveRecipeInProgress(type, id, ingredientsArray);
    linkToInProgress(`${pathName}/in-progress`);
  }

  function handleFinish(obj) {
    saveDoneRecipes(obj);
    linkToInProgress('/receitas-feitas');
  }

  function buttonTextHandler(type, urlID) { // muda o texto do botao de iniciar receita
    if (localStorage.getItem('inProgressRecipes') !== null
    && JSON.parse(localStorage.getItem('inProgressRecipes'))[type] !== undefined
    && JSON.parse(localStorage.getItem('inProgressRecipes'))[type][urlID] !== undefined) {
      return 'Continuar Receita';
    }
    return 'Iniciar Receita';
  }

  const context = { foods,
    showToast,
    drinks,
    setFoods,
    setDrinks,
    requestRecipes,
    ingredientsAndMeasures,
    selectedRange,
    handleStartRecipe,
    ingredientsToNumbersArray,
    buttonTextHandler,
    shareRecipe,
    handleFavorite,
    handleFinish,
    linkToInProgress,
  };
  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
