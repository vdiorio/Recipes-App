import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';
import favorite from '../images/whiteHeartIcon.svg';
import Carousel from '../components/Carousel';
import './FoodsRecipes.css';
import fetchFoodAPI from '../helpers/FetchFoodApi';

export default function FoodsRecipes({ match }) {
  const [foodSelected, setFoodSelected] = useState([]);

  useEffect(() => {
    fetchFoodAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
      .then((response) => setFoodSelected(response.meals));
  }, [match]);

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
      {foodSelected.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div>
            <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
            <button type="button" data-testid="share-btn" className="media-btn">
              <img src={ shareIcon } alt="Share Icon" width="20px" />
            </button>
            <button type="button" data-testid="favorite-btn" className="media-btn">
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
            <p>Your browser does not support this content</p>
          </iframe>
          <h3>Recomendadas</h3>
          <Carousel />
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="star-recipe-btn"
          >
            Start Recipe
          </button>
        </div>))}
    </div>
  );
}

FoodsRecipes.propTypes = {
  match: PropTypes.shape().isRequired,
};
