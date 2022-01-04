import foodIngredientFetch, { INGREDIENT } from './radioStuff/foodIngredientFetch';
import foodNameFecth, { NAME } from './radioStuff/foodNameFetch';
import foodFirstLetterFetch, { FIRST_LETTER } from './radioStuff/foodFirstLetterFetch';

export default async function foodRadio(input, radioInput) {
  let ingredientResult;
  let nameResult;
  let firstLetterResult;
  switch (radioInput) {
  case INGREDIENT:
    ingredientResult = await foodIngredientFetch(input);
    console.log(ingredientResult);
    break;
  case NAME:
    nameResult = await foodNameFecth(input);
    console.log(nameResult);
    break;
  case FIRST_LETTER:
    if (input.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      break;
    }

    firstLetterResult = await foodFirstLetterFetch(input);
    console.log(firstLetterResult);
    break;
  case '':
    global.alert('Selecione uma categoria para poder pesquisar');
    break;
  default:
    break;
  }
}
