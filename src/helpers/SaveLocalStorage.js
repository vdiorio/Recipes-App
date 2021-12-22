export function SaveLocalStorage(value) {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('user', JSON.stringify({ email: value }));
}

export function saveRecipeInProgress(path) {
  const type = path.split('/')[1];
  const ID = path.split('/')[2];
  localStorage.setItem(`${type === 'comidas' ? 'meals' : 'cocktails'}`, JSON.stringify({
    ...JSON.parse(localStorage.getItem(`${type === 'comidas' ? 'meals' : 'cocktails'}`)),
    [ID]: [],
  }));
}
