const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const FIRST_LETTER = 'primeira-letra';

const drinkFirstLetterFetch = async (letter) => {
  const request = await fetch(`${URL}${letter}`);
  const response = await request.json();
  return response.drinks;
};

export default drinkFirstLetterFetch;
