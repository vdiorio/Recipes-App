function SaveLocalStorage(value) {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('user', JSON.stringify({ email: value }));
}

export default SaveLocalStorage;
