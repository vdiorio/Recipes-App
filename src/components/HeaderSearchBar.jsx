import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import tw from 'twin.macro';
import AppContext from '../context/ContextAPI';
import foodRadio from '../helpers/foodRadio';
import drinkRadio from '../helpers/drinkRadio';

const SearchContainer = tw.header`
  w-full
  px-3
`;

const FormInputsSearch = tw.form`
  w-full
  px-3
  flex
  flex-row
  justify-between
  my-2
  font-serif
`;

const InputSearch = tw.input`
  w-full
  px-2
  bg-gray-100
  rounded-2xl
  h-8
  border-2
  text-center
  border-black
`;

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
    <SearchContainer>
      <div>
        <InputSearch
          type="text"
          placeholder="search recipes"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setInput(value) }
        />
      </div>
      <FormInputsSearch>
        <label htmlFor="ingrediente">
          <input
            type="radio"
            id="ingrediente"
            name="radio"
            value="ingrediente"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => handleChange(target) }
          />
          &nbsp;Ingredients
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
          &nbsp;By name
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
          &nbsp;First letter
        </label>
      </FormInputsSearch>
      <div className="my-2 flex justify-center">
        <button
          className="bg-yellow-300 rounded-md w-40 font-bold"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => ingredientResponse(input, radioInput) }
        >
          Search
        </button>
      </div>
    </SearchContainer>
  );
}
