import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextAPI from '../context/ContextAPI';

export default function FoodsRecipes({ match }) {
  const { foods } = useContext(ContextAPI);
  const selectedRecipe = foods.filter((food) => food.idMeal === match.params.id);
  return (
    <>
      {selectedRecipe.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            width="360"
            height="200"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
          <button type="button">
            <i src="../images/shareIcon" alt="Share Icon" />
          </button>
          <p data-testid="recipe-category">test</p>
          <pre data-testid="${index}-ingredient-name-and-measure">test</pre>
          <pre data-testid="instructions">test</pre>
          <video width="320" height="240" controls data-testid="video">
            <source src="movie.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div data-testid="${index}-recomendation-card" />
          <button type="button" data-testid="start-recipe-btn">te</button>
        </div>
      ))}
    </>
  );
}

FoodsRecipes.propTypes = {
  match: PropTypes.shape().isRequired,
};
