import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import tw from 'twin.macro';
import styled from 'styled-components';
import shareIcon from '../images/shareIcon.svg';
import './FoodsRecipes.css';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import ContextAPI from '../context/ContextAPI';
import favorite from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';
import NewCarousel from '../components/NewCarousel';

const MainContainer = tw.main`
  w-screen
  flex
  flex-col
  content-center
  sm:w-5/6
  sm:mx-auto
`;
const RecipeHeader = tw.div`
  w-full
  sm:flex
  sm:content-center
  sm:w-5/6
  sm:mx-auto sm:mb-10
`;

const TextRecipeContainer = tw.h6`
w-full
p-3 sm:text-center sm:mb-6
text-gray-600 
font-family[Itim, cursive]
sm:text-2xl sm:p-0
`;

const TitleRecipe = tw.h6`
  text-gray-600 
  font-family[Itim, cursive]
  text-3xl
  sm:text-5xl sm: text-left
`;

const MidiaContainer = tw.div`
  font-family[Itim, cursive]
  flex
  flex-col
  items-center
  text-gray-600 
  content-center
  sm:flex-row
  w-full
  mb-16
`;

const ButtonStartRecipe = styled.button`   
  transform: translateX(-50%);
  ${tw`
  bg-yellow-300
  w-48
  h-10
  rounded-3xl
  font-bold 
  bottom-0
  left-1/2
  fixed
  text-center
  z-30
  hover:w-56
  hover:h-12
  hover:bg-yellow-500
  sm:hover:w-96
  sm:w-80 sm:h-14 sm:text-2xl
  `}
  `;

export default function FoodsRecipes({ match, location }) {
  const {
    ingredientsAndMeasures, handleStartRecipe, ingredientsToNumbersArray,
    buttonTextHandler, shareRecipe, showToast, handleFavorite,
  } = useContext(ContextAPI);
  const [isNotDone, setIsNotDone] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [foodSelected, setFoodSelected] = useState();
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
    fetchFoodAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlID}`)
      .then((response) => setFoodSelected(response.meals));
    setIsNotDone(isRecipeNotDone(pathName));
    isRecipeFavorite(pathName);
  }, [urlID, pathName]);

  return (
    <MainContainer>
      { foodSelected ? (
        <div>
          <RecipeHeader>
            <div className="w-full">
              <img
                src={ foodSelected[0].strMealThumb }
                alt={ foodSelected[0].strMeal }
                data-testid="recipe-photo"
                className="sm:w-4/5 sm:mx-auto sm:mt-4"
              />
            </div>
            <div className="absolute top-4 right-4 w-fit sm:right-1/4">
              <button
                type="button"
                data-testid="share-btn"
                className="media-btn mx-2"
                onClick={ shareRecipe }
              >
                <img
                  src={ shareIcon }
                  alt="Share Icon"
                  className="media-btn-img"
                />
              </button>

              <button
                onClick={ () => handleFavorite(
                  isFavorite, [favorite, favoriteChecked],
                  setIsFavorite, foodSelected[0],
                ) }
                type="button"
                className="media-btn"
              >
                <img
                  data-testid="favorite-btn"
                  src={ isFavorite }
                  alt="Favorite Icon"
                  className="media-btn-img mx-2"
                />
              </button>
            </div>

            <TextRecipeContainer>
              <TitleRecipe
                data-testid="recipe-title"
              >
                {foodSelected[0].strMeal}
              </TitleRecipe>
              <p
                data-testid="recipe-category"
                className="italic sm:text-left"
              >
                {foodSelected[0].strCategory}
              </p>
              <h3 className="underline mt-3 mb-1">Ingredients</h3>
              <p className="text-xs sm:text-base">
                { ingredientsAndMeasures(foodSelected[0], type, 'detail') }
              </p>

            </TextRecipeContainer>
          </RecipeHeader>

          <TextRecipeContainer>

            <h3 className="underline mt-3 mb-1">Instructions</h3>
            <p
              data-testid="instructions"
              className="text-justify m-0 p-0"
            >
              {foodSelected[0].strInstructions}
            </p>
          </TextRecipeContainer>

          {/* Container das mídias da receita */}
          <MidiaContainer>
            <div className="flex flex-col w-full h-full items-center">
              <h3 className="my-3 text-xl underline">Video</h3>
              {foodSelected[0].strYoutube === '' ? (
                <p>No video avaiable</p>
              ) : (
                <iframe
                  data-testid="video"
                  title="Recipe Video"
                  className="sm:h-80 sm:w-11/12"
                  src={ foodSelected[0].strYoutube.replace('watch?v=', 'embed/') }
                >
                  <p>Your browser does not support this content</p>
                </iframe>)}
            </div>
            <div className="flex flex-col w-full h-full items-center">
              <h3 className="my-3 text-xl underline">Recomended</h3>
              <NewCarousel
                genre="Meal"
              />
            </div>
          </MidiaContainer>
          <ButtonStartRecipe
            type="button"
            data-testid="start-recipe-btn"
            style={ buttonVisible }
            onClick={ () => handleStartRecipe(
              pathName,
              type,
              urlID,
              ingredientsToNumbersArray(foodSelected[0], type, urlID),
            ) }
          >
            { buttonTextHandler(type, urlID) }
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

FoodsRecipes.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};
