import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from '../context/ContextAPI';
import foodRadio from '../helpers/foodRadio';
import drinkRadio from '../helpers/drinkRadio';

export default function HeaderSearchBar() {
  const { setFoods, setShowComponent, setDrinks } = useContext(AppContext);
  const [input, setInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const location = useLocation();
  const history = useHistory();

  const MAX_CARDS = 12;

  const handleChange = ({ value }) => {
    setRadioInput(value);
  };

  const handleMaxCards = (recipes) => recipes
    .filter((_recipe, index) => index < MAX_CARDS);

  const foodRedirect = (load) => {
    setShowComponent(false);
    setFoods(load);
    const id = load[0].idMeal;
    history.push(`/comidas/${id}`);
  };

  const drinkRedirect = (load) => {
    setShowComponent(false);
    setDrinks(load);
    const id = load[0].idDrink;
    history.push(`/bebidas/${id}`);
  };

  const foodResponse = async (search, category) => {
    const foodReturn = await foodRadio(search, category);
    if (foodReturn) {
      if (foodReturn.length === 1) {
        foodRedirect(foodReturn);
        return;
      }
      setShowComponent(false);
      const recipes = foodReturn.length > MAX_CARDS
        ? handleMaxCards(foodReturn) : foodReturn;
      setFoods(recipes);
    }
  };

  const drinkresponse = async (search, category) => {
    const drinkReturn = await drinkRadio(search, category);
    if (drinkReturn) {
      if (drinkReturn.length === 1) {
        drinkRedirect(drinkReturn);
        return;
      }
      setShowComponent(false);
      const recipes = drinkReturn.length > MAX_CARDS
        ? handleMaxCards(drinkReturn) : drinkReturn;
      setDrinks(recipes);
    }
  };

  const ingredientResponse = async (inputText, radioInputText) => {
    const { pathname } = location;
    if (pathname === '/comidas') {
      await foodResponse(inputText, radioInputText);
    }
    if (pathname === '/bebidas') {
      await drinkresponse(inputText, radioInputText);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="pesquisar receita"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setInput(value) }
        />
      </div>
      <form>
        <label htmlFor="ingrediente">
          <input
            type="radio"
            id="ingrediente"
            name="radio"
            value="ingrediente"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => handleChange(target) }
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            type="radio"
            id="nome"
            name="radio"
            value="nome"
            data-testid="name-search-radio"
            onChange={ ({ target }) => handleChange(target) }
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            type="radio"
            id="primeira-letra"
            name="radio"
            value="primeira-letra"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => handleChange(target) }
          />
          Primeira letra
        </label>
      </form>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => ingredientResponse(input, radioInput) }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
