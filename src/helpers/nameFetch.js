const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const NAME = 'nome';

const nameFecth = async (name) => {
  const request = await fetch(`${URL}${name}`);
  const response = await request.json();
  return response;
};

export default nameFecth;
