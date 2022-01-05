export const NAME = 'nome';
export const INGREDIENT = 'ingrediente';
export const FIRST_LETTER = 'primeira-letra';

const FOOD_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOOD_FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const DRINK_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINK_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINK_FIRST_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

// const MAX_CARDS = 12;

const foodNameFecth = async (name) => {
  try {
    const request = await fetch(`${FOOD_NAME_URL}${name}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const foodIngredientFetch = async (ingredient) => {
  try {
    const request = await fetch(`${FOOD_INGREDIENT_URL}${ingredient}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error.message);
  }
};

const foodFirstLetterFetch = async (letter) => {
  try {
    const request = await fetch(`${FOOD_FIRST_LETTER_URL}${letter}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error.message);
  }
};

const drinkNameFetch = async (name) => {
  try {
    const request = await fetch(`${DRINK_NAME_URL}${name}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error.message);
  }
};

const drinkIngredientFetch = async (ingredient) => {
  try {
    const request = await fetch(`${DRINK_INGREDIENT_URL}${ingredient}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error.message);
  }
};

const drinkFirstLetterFetch = async (letter) => {
  try {
    const request = await fetch(`${DRINK_FIRST_LETTER_URL}${letter}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error.message);
  }
};

const requests = {
  foodName: (input) => foodNameFecth(input),
  foodIngredient: (input) => foodIngredientFetch(input),
  foodFirstLetter: (input) => foodFirstLetterFetch(input),
  drinkName: (input) => drinkNameFetch(input),
  drinkIngredient: (input) => drinkIngredientFetch(input),
  drinkFirstLetter: (input) => drinkFirstLetterFetch(input),
};

export default requests;
