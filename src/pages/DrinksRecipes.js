import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactLoading from 'react-loading';
// import placeHolder from '../tests/placeHolder';
import shareIcon from '../images/shareIcon.svg';
import Carousel from '../components/Carousel';
import './FoodsRecipes.css';
import fetchDrinkAPI from '../helpers/FetchDrinkAPI';
import ContextAPI from '../context/ContextAPI';
import favorite from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';

export default function FoodsRecipes({ match, location }) {
  const {
    ingredientsAndMeasures, handleStartRecipe, ingredientsToNumbersArray,
    buttonTextHandler, shareRecipe, showToast, handleFavorite,
  } = useContext(ContextAPI);
  const [isNotDone, setIsNotDone] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [drinkSelected, setDrinkSelected] = useState();
  const urlID = match.params.id;
  const pathName = location.pathname;
  const type = pathName.split('/')[1] === 'comidas' ? 'meals' : 'cocktails';
  const buttonVisible = { opacity: isNotDone ? 1 : 0 };

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

  function isRecipeNotDone(path) { // verifica se receita foi finalizada
    if (localStorage.getItem('doneRecipes') !== null) {
      const isItDone = localStorage.getItem('doneRecipes').includes(path.split('/')[2]);
      if (isItDone) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    fetchDrinkAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlID}`)
      .then((response) => setDrinkSelected(response.drinks));
    setIsNotDone(isRecipeNotDone(pathName));
    isRecipeFavorite(pathName);
  }, [urlID, pathName]);

  return (
    <div className="all">
      { drinkSelected ? (
        <div>
          <img
            src={ drinkSelected[0].strDrinkThumb }
            alt={ drinkSelected[0].strDrink }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div>
            <h1 data-testid="recipe-title">{drinkSelected[0].strDrink}</h1>
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
              className="media-btn"
              onClick={ () => handleFavorite(
                isFavorite, [favorite, favoriteChecked], setIsFavorite, drinkSelected[0],
              ) }
            >
              <img
                data-testid="favorite-btn"
                src={ isFavorite }
                alt="Favorite Icon"
                className="media-btn-img"
              />
            </button>
          </div>
          <p data-testid="recipe-category">{drinkSelected[0].strAlcoholic}</p>
          <h3>Ingredients</h3>
          { ingredientsAndMeasures(drinkSelected[0], type, 'detail') }
          <h3>Instructions</h3>
          <p
            data-testid="instructions"
            className="instructions"
          >
            {drinkSelected[0].strInstructions}

          </p>
          <h3>Recomendadas</h3>
          <Carousel
            genre="Drink"
          />
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="star-recipe-btn"
            style={ buttonVisible }
            onClick={ () => handleStartRecipe(
              pathName,
              type,
              urlID,
              ingredientsToNumbersArray(drinkSelected[0], type, urlID),
            ) }
          >
            { buttonTextHandler(type, urlID) }
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

FoodsRecipes.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};
