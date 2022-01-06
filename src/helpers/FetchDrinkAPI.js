const fetchDrinkAPI = async (URI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') => {
  const callAPI = await fetch(URI);
  const APIjson = await callAPI.json();
  return APIjson;
};

export default fetchDrinkAPI;
