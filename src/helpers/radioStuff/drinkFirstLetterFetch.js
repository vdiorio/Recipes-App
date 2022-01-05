const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const FIRST_LETTER = 'primeira-letra';

const drinkFirstLetterFetch = async (letter) => {
  try {
    const request = await fetch(`${URL}${letter}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error.message);
  }
};

export default drinkFirstLetterFetch;
