import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/ContextAPI';
import foodRadio from '../helpers/foodRadio';
import drinkRadio from '../helpers/drinkRadio';

export default function HeaderSearchBar() {
  const { setFoods, setShowComponent, setDrinks } = useContext(AppContext);
  const [input, setInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const location = useLocation();

  const handleChange = ({ value }) => {
    setRadioInput(value);
  };

  const ingredientResponse = async (inputText, radioInputText) => {
    const { pathname } = location;
    if (pathname === '/comidas') {
      const foodReturn = await foodRadio(inputText, radioInputText);
      if (foodReturn) {
        setShowComponent(false);
        setFoods(foodReturn);
      }
    }
    if (pathname === '/bebidas') {
      const drinkReturn = await drinkRadio(inputText, radioInputText);
      if (drinkReturn) {
        setShowComponent(false);
        setDrinks(drinkReturn);
      }
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
