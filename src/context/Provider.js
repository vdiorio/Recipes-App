import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './ContextAPI';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import fetchDrinkAPI from '../helpers/FetchDrinkAPI';

function Provider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

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

  function concatIngredientsAndMeasures(ingredientsArray, measuresArray, RANGE) { // une os ingredientes e medidas em uma string
    const concatenated = [];
    for (let index = 0; index <= RANGE; index += 1) {
      if (ingredientsArray[index] !== '' && ingredientsArray[index] !== null) {
        concatenated.push(
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${
              ingredientsArray[index]} - ${
              measuresArray[index] === null ? 'to your taste' : measuresArray[index]}`}

          </p>,
        );
      }
    }
    return concatenated;
  }

  function ingredientsAndMeasures(obj, recipeType) { // responsavel pela selecao e juncao dos ingredientes e medidas
    const fullArray = Object.values(obj);
    const MIN_INGREDIENTS = 9;
    const MAX_INGREDIENTS = 28;
    const MIN_MEASURES = 29;
    const MAX_MEASURES = 48;
    const MIN_DRINK_INGREDIENTS = 17;
    const MAX_DRINK_INGREDIENTS = 31;
    const MIN_DRINK_MEASURES = 32;
    const MAX_DRINK_MEASURES = 47;
    if (recipeType === 'meal') {
      const MAX_RANGE = 19;
      const ingredientsOnly = selectedRange(MIN_INGREDIENTS, MAX_INGREDIENTS, fullArray);
      const measuresOnly = selectedRange(MIN_MEASURES, MAX_MEASURES, fullArray);
      return concatIngredientsAndMeasures(ingredientsOnly, measuresOnly, MAX_RANGE);
    }
    if (recipeType === 'drink') {
      const MAX_RANGE = 14;
      const ingredientsOnly = selectedRange(
        MIN_DRINK_INGREDIENTS, MAX_DRINK_INGREDIENTS, fullArray,
      );
      const measuresOnly = selectedRange(
        MIN_DRINK_MEASURES, MAX_DRINK_MEASURES, fullArray,
      );
      return concatIngredientsAndMeasures(ingredientsOnly, measuresOnly, MAX_RANGE);
    }
  }

  const context = { foods,
    drinks,
    setFoods,
    setDrinks,
    requestRecipes,
    ingredientsAndMeasures };
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
