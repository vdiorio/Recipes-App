import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';
import favorite from '../images/whiteHeartIcon.svg';
import Carousel from '../components/Carousel';
import './FoodsRecipes.css';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import ContextAPI from '../context/ContextAPI';

export default function FoodsRecipes({ match }) {
  const { ingredientsAndMeasures } = useContext(ContextAPI);
  const [foodSelected, setFoodSelected] = useState([]);

  useEffect(() => {
    fetchFoodAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
      .then((response) => setFoodSelected(response.meals));
  }, [match]);

  return (
    <div className="all">
      { foodSelected.length > 0 ? (foodSelected.map((recipe, index) => (
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
          { ingredientsAndMeasures(recipe, 'meal') }
          <h3>Instructions</h3>
          <p
            data-testid="instructions"
            className="instructions"
          >
            {recipe.strInstructions}

          </p>
          <h3>Video</h3>
          {recipe.strYoutube === '' ? (
            <p>No video avaiable</p>
          ) : (
            <iframe
              data-testid="video"
              title="Recipe Video"
              className="video-frame"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            >
              <p>Your browser does not support this content</p>
            </iframe>)}
          <h3>Recomendadas</h3>
          <Carousel
            genre={ Object.keys(foodSelected[0])[0] }
          />
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="star-recipe-btn"
          >
            Start Recipe
          </button>
        </div>))
      ) : (
        <ReactLoading
          type="spinningBubbles"
          color="cyan"
          height={ 30 }
          width={ 30 }
        />
      )}
    </div>
  );
}

FoodsRecipes.propTypes = {
  match: PropTypes.shape().isRequired,
};
