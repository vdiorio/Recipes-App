import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import tw from 'twin.macro';
import styled from 'styled-components';
import shareIcon from '../images/shareIcon.svg';
import './FoodsInProgress.css';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import ContextAPI from '../context/ContextAPI';
import favorite from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';
import IngredientsCheckList from '../components/IngredientsCheckList';

const MainContainer = tw.main`
  w-full
`;

const TextRecipeContainer = tw.h6`
w-full
p-3
text-gray-600 
font-family[Itim, cursive]
`;

const TitleRecipe = tw.h6`
  text-gray-600 
  font-family[Itim, cursive]
  text-3xl
`;

const ButtonStartRecipe = styled.button`   
  transform: translateX(-50%);

  ${tw`
  bg-yellow-300
  w-48
  h-10
  rounded-3xl
  font-bold 
  drop-shadow-lg
  bottom-0
  left-1/2
  fixed
  text-center
  z-30
  hover:w-56
  disabled:bg-yellow-100
  `}
  `;
export default function FoodsInProgress({ match, location }) {
  const {
    shareRecipe, showToast, handleFavorite, handleFinish,
  } = useContext(ContextAPI);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [foodSelected, setFoodSelected] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const urlID = match.params.id;
  const pathName = location.pathname;
  const type = pathName.split('/')[1] === 'comidas' ? 'meals' : 'cocktails';

  function isRecipeFavorite(path) { // verifica se e favorita
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const isItFavorite = localStorage
        .getItem('favoriteRecipes').includes(path.split('/')[2]);
      if (isItFavorite) { return setIsFavorite(favoriteChecked); }
    }
    return setIsFavorite(favorite);
  }

  function checkDisabled() { // verifica se deve estar desabilitado
    const arrayOfIngredientsChecked = Array
      .from(document.getElementsByClassName('ingredient-step--checked'));
    const arrayOfIngredients = Array
      .from(document.getElementsByClassName('ingredient-step'));
    if (arrayOfIngredients.length === arrayOfIngredientsChecked.length
      && arrayOfIngredientsChecked.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    const DELAY = 300;
    fetchFoodAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlID}`)
      .then((response) => setFoodSelected(response.meals));
    isRecipeFavorite(pathName);
    setTimeout(() => checkDisabled(), DELAY);
  }, [urlID, pathName]);

  return (
    <MainContainer>
      { foodSelected ? (
        <div>
          <img
            src={ foodSelected[0].strMealThumb }
            alt={ foodSelected[0].strMeal }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div className="absolute  top-4 right-4">
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
                isFavorite, [favorite, favoriteChecked], setIsFavorite, foodSelected[0],
              ) }
            >
              <img
                src={ isFavorite }
                data-testid="favorite-btn"
                alt="Favorite Icon"
                className="media-btn-img"
              />
            </button>
          </div>
          <TextRecipeContainer>
            <TitleRecipe
              data-testid="recipe-title"
            >
              {foodSelected[0].strMeal}
            </TitleRecipe>
            <p data-testid="recipe-category">{foodSelected[0].strCategory}</p>
            <IngredientsCheckList
              recipeData={ foodSelected[0] }
              type={ type }
              urlID={ urlID }
              onChange={ () => checkDisabled() }
            />
            <h3 className="font-bold underline my-2 ">Instructions</h3>
            <p
              data-testid="instructions"
              className="instructions-in-progress"
            >
              {foodSelected[0].strInstructions}

            </p>
          </TextRecipeContainer>
          <ButtonStartRecipe
            type="button"
            data-testid="finish-recipe-btn"
            className="finish-recipe-btn"
            disabled={ isDisabled }
            onClick={ () => handleFinish(foodSelected[0]) }
          >
            Finalizar Receita
          </ButtonStartRecipe>
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
    </MainContainer>
  );
}

FoodsInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};
