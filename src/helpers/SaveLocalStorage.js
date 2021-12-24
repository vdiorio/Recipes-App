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
