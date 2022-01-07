import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from './ContextAPI';
import {
  saveRecipeInProgress, manageRecipeInProgress,
  saveFavoriteRecipes, removeFromFavoriteRecipes,
  saveDoneRecipes } from '../helpers/SaveLocalStorage';
import Checkbox from '../components/Checkbox';

const copy = require('clipboard-copy');

function Provider({ children }) {
  const [historyString, setHistoryString] = useState('');
  const [foods, setFoods] = useState([]);
  const [exploreFoods, setExploreFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [exploreDrinks, setExploreDrinks] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [showToast, setShowToast] = useState(
    <span className="copied-link">Link copiado!</span>,
  );
  const history = useHistory();
  const THREE_SECONDS = 3000;
  const STEP_CHECKED = 'ingredient-step--checked';

  function shareRecipe() {
    const splitted = window.location.href.split('/');
    const link = `${splitted[0]}/${splitted[1]}/${splitted[2]}/${
      splitted[3]}/${splitted[4]}`;
    copy(link);
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

  function selectedRange(keys, values, ingredientOrMeasure) { // filtra os itens pertinentes dentro do objeto
    if (ingredientOrMeasure === 'Measure') {
      return values
        .filter((_item, index) => keys[index].includes('Measure'));
    }
    return values
      .filter((_item, index) => keys[index].includes('Ingredient'));
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
      ? (item.parentElement.classList.add(STEP_CHECKED)
      ) : (
        item.parentElement.classList.remove(STEP_CHECKED))));
  }

  function concatIngredientsAndMeasures( // une os ingredientes e medidas em uma string
    arrayOfData, RANGE, pageType, arrayWithPath, // arrayOfData corresponde aos arrays de ingredientes e medidas
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

                <Checkbox
                  ingNumber={ index }
                  arrayOfData={ arrayOfData }
                  arrayWithPath={ arrayWithPath }
                />

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

  function ingredientsAndMeasures(obj, recipeType, pageType, arrayWithPath) { // responsavel pela selecao e juncao dos ingredientes e medidas
    const fullArray = Object.values(obj);
    const fullArrayKeys = Object.keys(obj);
    if (recipeType === 'meals') {
      const MAX_RANGE = 19;
      const ingredientsOnly = selectedRange(fullArrayKeys, fullArray, 'Ingredient');
      const measuresOnly = selectedRange(fullArrayKeys, fullArray, 'Measure');
      return concatIngredientsAndMeasures(
        [ingredientsOnly, measuresOnly], MAX_RANGE, pageType, arrayWithPath,
      );
    }
    if (recipeType === 'cocktails') {
      const MAX_RANGE = 14;
      const ingredientsOnly = selectedRange(fullArrayKeys, fullArray, 'Ingredient');
      const measuresOnly = selectedRange(fullArrayKeys, fullArray, 'Measure');
      return concatIngredientsAndMeasures(
        [ingredientsOnly, measuresOnly], MAX_RANGE, pageType, arrayWithPath,
      );
    }
  }

  function ingredientsToNumbersArray(obj, type, id) { // converte os ingredientes da receita em numeros
    const fullArray = Object.values(obj);
    const fullArrayKeys = Object.keys(obj);
    const savedInStorage = localStorage.getItem('inProgressRecipes');
    const newArray = [];
    let ingredientNumber = 0;
    const ingredientsOnly = fullArray
      .filter((_item, index) => fullArrayKeys[index].includes('Ingredient'));
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

  function linkToInProgress(newPath) { // direciona para alguma pagina,
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
    exploreDrinks,
    exploreFoods,
    historyString,
    setExploreDrinks,
    setExploreFoods,
    setFoods,
    setDrinks,
    setHistoryString,
    getCurrentProgress,
    ingredientsAndMeasures,
    handleStartRecipe,
    ingredientsToNumbersArray,
    buttonTextHandler,
    shareRecipe,
    handleFavorite,
    handleFinish,
    linkToInProgress,
    showComponent,
    setShowComponent,
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
