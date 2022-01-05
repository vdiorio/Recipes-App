const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const FIRST_LETTER = 'primeira-letra';

const foodFirstLetterFetch = async (letter) => {
  try {
    const request = await fetch(`${URL}${letter}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error.message);
  }
};

export default foodFirstLetterFetch;
