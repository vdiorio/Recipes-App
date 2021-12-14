const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

export const INGREDIENT = 'ingrediente';

const ingredientFetch = async (ingredient) => {
  const request = await fetch(`${URL}${ingredient}`);
  const response = await request.json();
  return response;
};

export default ingredientFetch;
