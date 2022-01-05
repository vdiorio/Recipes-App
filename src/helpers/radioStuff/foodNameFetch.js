const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const NAME = 'nome';

const foodNameFecth = async (name) => {
  try {
    const request = await fetch(`${URL}${name}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export default foodNameFecth;
