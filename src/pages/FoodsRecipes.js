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

export default function FoodsRecipes({ match, location }) {
  const {
    ingredientsAndMeasures,
    handleStartRecipe,
    ingredientsToNumbersArray,
    buttonTextHandler,
    shareRecipe,
  } = useContext(ContextAPI);
  const [isNotDone, setIsNotDone] = useState(false);
  const [foodSelected, setFoodSelected] = useState();
  const urlID = match.params.id;
  const pathName = location.pathname;
  const type = pathName.split('/')[1] === 'comidas' ? 'meals' : 'cocktails';

  function isRecipeNotDone(path) { // verifica se receita foi finalizada
    console.log('botao');
    if (localStorage.getItem('doneRecipes') !== null) {
      const isItDone = localStorage.getItem('doneRecipes').includes(path.split('/')[2]);
      if (isItDone) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    fetchFoodAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlID}`)
      .then((response) => setFoodSelected(response.meals));
    setIsNotDone(isRecipeNotDone(pathName));
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
              <img src={ shareIcon } alt="Share Icon" width="20px" />
            </button>
            <button type="button" data-testid="favorite-btn" className="media-btn">
              <img src={ favorite } alt="Favorite Icon" width="20px" />
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
          <h3>Video</h3>
          {foodSelected[0].strYoutube === '' ? (
            <p>No video avaiable</p>
          ) : (
            <iframe
              data-testid="video"
              title="Recipe Video"
              className="video-frame"
              src={ foodSelected[0].strYoutube.replace('watch?v=', 'embed/') }
            >
              <p>Your browser does not support this content</p>
            </iframe>)}
          <h3>Recomendadas</h3>
          <Carousel
            genre={ Object.keys(foodSelected[0])[0] }
          />
          {}
          { isNotDone && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="star-recipe-btn"
              onClick={ () => handleStartRecipe(
                pathName,
                type,
                urlID,
                ingredientsToNumbersArray(foodSelected[0], type, urlID),
              ) }
            >
              { buttonTextHandler(type, urlID) }
            </button>)}
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

FoodsRecipes.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};
