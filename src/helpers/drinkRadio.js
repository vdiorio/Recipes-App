import requests, { NAME, INGREDIENT, FIRST_LETTER } from './radioStuff/requests';

export default async function drinkRadio(input, radioInput) {
  if (input === '') {
    global.alert('Campo de pesquisa não preenchido');
    return;
  }
  const ALERT = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  let result = [];
  switch (radioInput) {
  case INGREDIENT:
    result = await requests.drinkIngredient(input);
    if (!result) {
      global.alert(ALERT);
      return;
    }
    return result;
  case NAME:
    result = await requests.drinkName(input);
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

    result = await requests.drinkFirstLetter(input);
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
