const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const FIRST_LETTER = 'primeira-letra';

const firstLetterFetch = async (letter) => {
  const request = await fetch(`${URL}${letter}`);
  const response = await request.json();
  return response;
};

export default firstLetterFetch;
