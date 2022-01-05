import foodIngredientFetch, { INGREDIENT } from './radioStuff/foodIngredientFetch';
import foodNameFecth, { NAME } from './radioStuff/foodNameFetch';
import foodFirstLetterFetch, { FIRST_LETTER } from './radioStuff/foodFirstLetterFetch';

export default async function foodRadio(input, radioInput) {
  if (input === '') {
    global.alert('Campo de pesquisa não preenchido');
    return;
  }
  const ALERT = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  let result = [];
  switch (radioInput) {
  case INGREDIENT:
    result = await foodIngredientFetch(input);
    if (!result) {
      global.alert(ALERT);
      return;
    }
    return result;
  case NAME:
    result = await foodNameFecth(input);
    if (!result) {
      global.alert(ALERT);
      return;
    }
    return result;
  case FIRST_LETTER:
    if (input.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      break;
    }
    result = await foodFirstLetterFetch(input);
    if (!result) {
      global.alert(ALERT);
      return;
    }
    return result;
  case '':
    global.alert('Selecione uma categoria para poder pesquisar');
    break;
  default:
    break;
  }
}
