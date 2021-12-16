import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextAPI from '../context/ContextAPI';
import shareIcon from '../images/shareIcon.svg';
import favorite from '../images/whiteHeartIcon.svg';

export default function FoodsRecipes({ match }) {
  const { foods } = useContext(ContextAPI);
  const selectedRecipe = foods.filter((food) => food.idMeal === match.params.id);

  function selectedRange(MIN, MAX, arrayToBeFiltered) {
    return arrayToBeFiltered.filter((_item, index) => (
      index >= MIN && index <= MAX
    ));
  }

  function concatIngredientsAndMeasures(ingredientsArray, measuresArray, RANGE) {
    const concatenated = [];
    for (let index = 0; index <= RANGE; index += 1) {
      if (ingredientsArray[index] !== '') {
        concatenated.push(
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredientsArray[index]} - ${measuresArray[index]}`}

          </p>,
        );
      }
    }
    return concatenated;
  }

  function ingredientsAndMeasures(obj) {
    const fullArray = Object.values(obj);
    const MIN_INGREDIENTS = 9;
    const MAX_INGREDIENTS = 28;
    const MIN_MEASURES = 29;
    const MAX_MEASURES = 48;
    const MAX_RANGE = 19;
    const ingredientsOnly = selectedRange(MIN_INGREDIENTS, MAX_INGREDIENTS, fullArray);
    const measuresOnly = selectedRange(MIN_MEASURES, MAX_MEASURES, fullArray);
    return concatIngredientsAndMeasures(ingredientsOnly, measuresOnly, MAX_RANGE);
  }

  return (
    <div>
      {selectedRecipe.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            width="360"
            height="200"
            data-testid="recipe-photo"
          />
          <div>
            <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
            <button type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="Share Icon" width="20px" />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ favorite } alt="Favorite Icon" width="20px" />
            </button>
          </div>
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <h3>Ingredients</h3>
          { ingredientsAndMeasures(recipe) }
          <h3>Instructions</h3>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <h3>Video</h3>
          <iframe
            data-testid="video"
            title="Recipe Video"
            width="360"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          >
            <p>Your browsert does not support this content</p>
          </iframe>
          <h3>Recomendadas</h3>
          <div data-testid="${index}-recomendation-card">test</div>
          <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
        </div>))}
    </div>
  );
}

FoodsRecipes.propTypes = {
  match: PropTypes.shape().isRequired,
};
