import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';
import './FoodsRecipes.css';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import ContextAPI from '../context/ContextAPI';
import favorite from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';

export default function FoodsInProgress({ match, location }) {
  const {
    ingredientsAndMeasures, handleStartRecipe, ingredientsToNumbersArray,
    buttonTextHandler, shareRecipe, showToast, handleFavorite,
  } = useContext(ContextAPI);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [foodSelected, setFoodSelected] = useState();
  const urlID = match.params.id;
  const pathName = location.pathname;
  const type = pathName.split('/')[1] === 'comidas' ? 'meals' : 'cocktails';

  function isRecipeFavorite(path) { // verifica se e favorita
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const isItFavorite = localStorage
        .getItem('favoriteRecipes').includes(path.split('/')[2]);
      if (isItFavorite) {
        return setIsFavorite(favoriteChecked);
      }
    }
    return setIsFavorite(favorite);
  }

  useEffect(() => {
    fetchFoodAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlID}`)
      .then((response) => setFoodSelected(response.meals));
    isRecipeFavorite(pathName);
  }, [urlID, pathName]);

  return (
    <div className="all">
      { foodSelected ? (
        <div>
          <img
            src={ foodSelected[0].strMealThumb }
            alt={ foodSelected[0].strMeal }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div>
            <h1 data-testid="recipe-title">{foodSelected[0].strMeal}</h1>
            <button
              type="button"
              data-testid="share-btn"
              className="media-btn"
              onClick={ shareRecipe }
            >
              <img
                src={ shareIcon }
                alt="Share Icon"
                className="media-btn-img"
              />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              className="media-btn"
              onClick={ () => handleFavorite(
                isFavorite, [favorite, favoriteChecked], setIsFavorite, foodSelected[0],
              ) }
            >
              <img
                src={ isFavorite }
                alt="Favorite Icon"
                className="media-btn-img"
              />
            </button>
          </div>
          <p data-testid="recipe-category">{foodSelected[0].strCategory}</p>
          <h3>Ingredients</h3>
          { ingredientsAndMeasures(foodSelected[0], 'meal') }
          <h3>Instructions</h3>
          <p
            data-testid="instructions"
            className="instructions"
          >
            {foodSelected[0].strInstructions}

          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="star-recipe-btn"
            // onClick deve ser implementada aqui possivelmente
          >
            Finalizar Receita
          </button>
          {showToast}
        </div>
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

FoodsInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};
