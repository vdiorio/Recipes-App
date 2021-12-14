import React, { useState } from 'react';
import ingredientFetch, { INGREDIENT } from '../helpers/IngredientFetch';
import nameFecth, { NAME } from '../helpers/nameFetch';
import firstLetterFetch, { FIRST_LETTER } from '../helpers/firstLetterFetch';

export default function HeaderSearchBar() {
  const [input, setInput] = useState('');
  const [radioInput, setRadioInput] = useState('');

  const handleChange = ({ value }) => {
    setRadioInput(value);
  };

  const ingredientResponse = async () => {
    let ingredientResult;
    let nameResult;
    let firstLetterResult;
    switch (radioInput) {
    case INGREDIENT:
      ingredientResult = await ingredientFetch(input);
      console.log(ingredientResult);
      break;
    case NAME:
      nameResult = await nameFecth(input);
      console.log(nameResult);
      break;
    case FIRST_LETTER:
      if (input.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }

      firstLetterResult = await firstLetterFetch(input);
      console.log(firstLetterResult);
      break;
    case '':
      global.alert('digite algo para poder pesquisar');
      break;
    default:
      break;
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
          onClick={ () => ingredientResponse() }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
