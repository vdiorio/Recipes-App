const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const NAME = 'nome';

const drinkNameFetch = async (name) => {
  try {
    const request = await fetch(`${URL}${name}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error.message);
  }
};

export default drinkNameFetch;
