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

export default function FoodsRecipes({ match }) {
  const { ingredientsAndMeasures } = useContext(ContextAPI);
  const [drinkSelected, setDrinkSelected] = useState([]);

  useEffect(() => {
    fetchDrinkAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
      .then((response) => setDrinkSelected(response.drinks));
  }, [match]);

  return (
    <div className="all">
      {drinkSelected.length > 0 ? (drinkSelected.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div>
            <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
            <button type="button" data-testid="share-btn" className="media-btn">
              <img src={ shareIcon } alt="Share Icon" width="20px" />
            </button>
            <button type="button" data-testid="favorite-btn" className="media-btn">
              <img src={ favorite } alt="Favorite Icon" width="20px" />
            </button>
          </div>
          <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
          <h3>Ingredients</h3>
          { ingredientsAndMeasures(recipe, 'drink') }
          <h3>Instructions</h3>
          <p
            data-testid="instructions"
            className="instructions"
          >
            {recipe.strInstructions}

          </p>
          <h3>Recomendadas</h3>
          <Carousel
            genre={ Object.keys(drinkSelected[0])[0] }
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
