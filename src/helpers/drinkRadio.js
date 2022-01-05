import drinkIngredientFetch, { INGREDIENT } from './radioStuff/drinkIngredientFetch';
import drinkFirsLetterFetch, { FIRST_LETTER } from './radioStuff/drinkFirstLetterFetch';
import drinkNameFetch, { NAME } from './radioStuff/drinkNameFetch';

export default async function drinkRadio(input, radioInput) {
  if (input === '') {
    global.alert('Campo de pesquisa não preenchido');
    return;
  }
  const ALERT = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  let result = [];
  switch (radioInput) {
  case INGREDIENT:
    result = await drinkIngredientFetch(input);
    if (!result) {
      global.alert(ALERT);
      return;
    }
    return result;
  case NAME:
    result = await drinkNameFetch(input);
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

    result = await drinkFirsLetterFetch(input);
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
