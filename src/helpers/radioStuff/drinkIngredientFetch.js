const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

export const INGREDIENT = 'ingrediente';

const drinkIngredientFetch = async (ingredient) => {
  try {
    const request = await fetch(`${URL}${ingredient}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error.message);
  }
};

export default drinkIngredientFetch;
