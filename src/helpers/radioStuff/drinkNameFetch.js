const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const NAME = 'nome';

const drinkNameFetch = async (name) => {
  const request = await fetch(`${URL}${name}`);
  const response = await request.json();
  return response;
};

export default drinkNameFetch;
