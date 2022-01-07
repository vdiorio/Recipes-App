export function SaveLocalStorage(value) {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('user', JSON.stringify({ email: value }));
}

export function saveRecipeInProgress(type, id, ingredientsArray) { // cria e administra o local storage de receitas em progresso
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [type]: {
        [id]: ingredientsArray },
    }));
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...JSON.parse(localStorage.getItem('inProgressRecipes')),
    [type]: {
      ...JSON.parse(localStorage.getItem('inProgressRecipes'))[type],
      [id]: ingredientsArray,
    },
  }));
}

export function manageRecipeInProgress(newArray, type, id) {
  if (localStorage.getItem('inProgressRecipes') === null) {
    saveRecipeInProgress(type, id, newArray);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...JSON.parse(localStorage.getItem('inProgressRecipes')),
    [type]: {
      ...JSON.parse(localStorage.getItem('inProgressRecipes'))[type],
      [id]: newArray,
    },
  }));
}

export function saveFavoriteRecipes(obj) { // adiciona itens ao array de receitas favoritas
  const newFavorite = {
    id: Object.values(obj)[0],
    type: Object.keys(obj)[0].includes('Meal') ? 'comida' : 'bebida',
    area: Object.keys(obj)[0].includes('Meal') ? obj.strArea : '',
    category: obj.strCategory,
    alcoholicOrNot: Object.keys(obj)[0].includes('Meal') ? '' : obj.strAlcoholic,
    name: Object.keys(obj)[0].includes('Meal') ? obj.strMeal : obj.strDrink,
    image: Object.keys(obj)[0].includes('Meal') ? obj.strMealThumb : obj.strDrinkThumb,
  };
  const arrayOfFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (localStorage.getItem('favoriteRecipes') === null) {
    return localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
  }
  arrayOfFavorite.push(newFavorite);
  return localStorage.setItem('favoriteRecipes', JSON
    .stringify(arrayOfFavorite));
}

export function saveDoneRecipes(obj) { // adiciona itens ao array de receitas finalizadas
  const date = new Date();
  const newFavorite = {
    id: Object.values(obj)[0],
    type: Object.keys(obj)[0].includes('Meal') ? 'comida' : 'bebida',
    area: Object.keys(obj)[0].includes('Meal') ? obj.strArea : '',
    category: obj.strCategory,
    alcoholicOrNot: Object.keys(obj)[0].includes('Meal') ? '' : obj.strAlcoholic,
    name: Object.keys(obj)[0].includes('Meal') ? obj.strMeal : obj.strDrink,
    image: Object.keys(obj)[0].includes('Meal') ? obj.strMealThumb : obj.strDrinkThumb,
    doneDate: `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`,
    tags: obj.strTags === null ? [] : obj.strTags.split(','),
  };
  const arrayOfDone = JSON.parse(localStorage.getItem('doneRecipes'));
  if (localStorage.getItem('doneRecipes') === null) {
    return localStorage.setItem('doneRecipes', JSON.stringify([newFavorite]));
  }
  if (localStorage.getItem('doneRecipes').includes(Object.values(obj)[0])) {
    return localStorage.getItem('doneRecipes');
  }
  arrayOfDone.push(newFavorite);
  return localStorage.setItem('doneRecipes', JSON
    .stringify(arrayOfDone));
}

export function removeFromFavoriteRecipes(obj) {
  const arrayOfFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newArray = arrayOfFavorite
    .filter((favoriteObject) => favoriteObject.id !== Object.values(obj)[0]);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
}
