import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';
import favorite from '../images/whiteHeartIcon.svg';
import Carousel from '../components/Carousel';
import './FoodsRecipes.css';
import fetchDrinkAPI from '../helpers/FetchDrinkAPI';
import ContextAPI from '../context/ContextAPI';

export default function FoodsRecipes({ match, location }) {
  const {
    ingredientsAndMeasures,
    handleStartRecipe,
    ingredientsToNumbersArray,
  } = useContext(ContextAPI);
  const [isNotDone, setIsNotDone] = useState(false);
  const [drinkSelected, setDrinkSelected] = useState();
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
    fetchDrinkAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlID}`)
      .then((response) => setDrinkSelected(response.drinks));
    setIsNotDone(isRecipeNotDone(pathName));
  }, [urlID, pathName]);

  return (
    <div className="all">
      {drinkSelected ? (
        <div>
          <img
            src={ drinkSelected[0].strDrinkThumb }
            alt={ drinkSelected[0].strDrink }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div>
            <h1 data-testid="recipe-title">{drinkSelected[0].strDrink}</h1>
            <button type="button" data-testid="share-btn" className="media-btn">
              <img src={ shareIcon } alt="Share Icon" width="20px" />
            </button>
            <button type="button" data-testid="favorite-btn" className="media-btn">
              <img src={ favorite } alt="Favorite Icon" width="20px" />
            </button>
          </div>
          <p data-testid="recipe-category">{drinkSelected[0].strAlcoholic}</p>
          <h3>Ingredients</h3>
          { ingredientsAndMeasures(drinkSelected[0], 'drink') }
          <h3>Instructions</h3>
          <p
            data-testid="instructions"
            className="instructions"
          >
            {drinkSelected[0].strInstructions}

          </p>
          <h3>Recomendadas</h3>
          <Carousel
            genre={ Object.keys(drinkSelected[0])[0] }
          />
          { isNotDone && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="star-recipe-btn"
              onClick={ () => handleStartRecipe(
                pathName,
                type,
                urlID,
                ingredientsToNumbersArray(drinkSelected[0], type, urlID),
              ) }
            >
              Start Recipe
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
