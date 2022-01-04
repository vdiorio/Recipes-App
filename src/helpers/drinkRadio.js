import drinkIngredientFetch, { INGREDIENT } from './radioStuff/drinkIngredientFetch';
import drinkFirsLetterFetch, { FIRST_LETTER } from './radioStuff/drinkFirstLetterFetch';
import drinkNameFetch, { NAME } from './radioStuff/drinkNameFetch';

export default async function drinkRadio(input, radioInput) {
  let ingredientResult;
  let nameResult;
  let firstLetterResult;
  switch (radioInput) {
  case INGREDIENT:
    ingredientResult = await drinkIngredientFetch(input);
    console.log(ingredientResult);
    break;
  case NAME:
    nameResult = await drinkNameFetch(input);
    console.log(nameResult);
    break;
  case FIRST_LETTER:
    if (input.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      break;
    }

    firstLetterResult = await drinkFirsLetterFetch(input);
    console.log(firstLetterResult);
    break;
  case '':
    global.alert('Selecione uma categoria para poder pesquisar');
    break;
  default:
    break;
  }
}
