const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=';

export const INGREDIENT = 'ingrediente';

const drinkIngredientFetch = async (ingredient) => {
  const request = await fetch(`${URL}${ingredient}`);
  const response = await request.json();
  return response;
};

export default drinkIngredientFetch;
