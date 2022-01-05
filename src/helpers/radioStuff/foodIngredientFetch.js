const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

export const INGREDIENT = 'ingrediente';

const foodIngredientFetch = async (ingredient) => {
  try {
    const request = await fetch(`${URL}${ingredient}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error.message);
  }
};

export default foodIngredientFetch;
