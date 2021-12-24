export function SaveLocalStorage(value) {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('user', JSON.stringify({ email: value }));
}

export function saveRecipeInProgress(path) {
  const type = path.split('/')[1] === 'comidas' ? 'meals' : 'cocktails';
  const ID = path.split('/')[2];
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      chave: 'uberaba',
      [type]: {
        [ID]: 1 },
    }));
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...JSON.parse(localStorage.getItem('inProgressRecipes')),
    [type]: {
      ...JSON.parse(localStorage.getItem('inProgressRecipes'))[type],
      [ID]: 1,
    },
  }));
}
