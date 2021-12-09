const fetchDrinkAPI = async () => {
  const callAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const APIjson = await callAPI.json();
  return APIjson;
};

export default fetchDrinkAPI;
