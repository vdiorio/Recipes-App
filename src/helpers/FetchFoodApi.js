const fetchFoodAPI = async (URI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=') => {
  const callAPI = await fetch(URI);
  const APIjson = await callAPI.json();
  return APIjson;
};

export default fetchFoodAPI;
