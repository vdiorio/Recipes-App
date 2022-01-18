import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import tw from 'twin.macro';
import RecipeCard from './RecipeCard';
import './Carousel.css';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import fetchDrinkAPI from '../helpers/FetchDrinkAPI';

const CardContainerCarousel = tw.div`
  w-full
  content-center
`;
export default function Carousel({ genre }) {
  const [recommended, setRecommended] = useState([]);
  const [current, setCurrent] = useState(0);
  const MAX_CARDS = 6;

  useEffect(() => {
    function requestRecipes(MAX_AMOUNT, requestLink) { // fetch para os cards de recomendacoes
      if (requestLink === 'Meal') {
        fetchFoodAPI().then((response) => {
          setRecommended(response.meals.filter((_item, i) => i < MAX_AMOUNT));
        });
      }
      if (requestLink === 'Drink') {
        fetchDrinkAPI().then((response) => {
          setRecommended(response.drinks.filter((_item, i) => i < MAX_AMOUNT));
        });
      }
    }
    requestRecipes(MAX_CARDS, genre === 'Meal' ? 'Drink' : 'Meal');
  }, [genre]);

  function previousSlides() {
    const INDEX_LIMIT = 5;
    setCurrent(current === 0 ? INDEX_LIMIT : current - 1);
  }

  function nextSlides() {
    const INDEX_LIMIT = 5;
    setCurrent(current === INDEX_LIMIT ? 0 : current + 1);
  }

  function drinksRecommendation() {
    return recommended.map((drink, index) => (
      <CardContainerCarousel
        key={ drink.idDrink }
        data-testid={ `${index}-recomendation-card` }
        className={
          current === index // verificando card atual
            ? `recommended active ${
              index % 2 === 0 ? 'left' : 'right' // verificando posicao do card
            }` : 'recommended'
        }
      >

        <RecipeCard
          recipe={ drink }
          index={ index }
          place="carousel"
        />

      </CardContainerCarousel>
    ));
  }

  function foodsRecommendation() {
    return recommended.map((food, index) => (
      <div
        key={ food.idMeal }
        data-testid={ `${index}-recomendation-card` }
        className={
          current === index // verificando card atual
            ? `recommended active ${
              index % 2 === 0 ? 'left' : 'right' // verificando posicao do card
            }` : 'recommended'
        }
      >
        <RecipeCard
          recipe={ food }
          index={ index }
          place="carousel"
        />

      </div>
    ));
  }

  return (

    <div className="carousel">
      <button type="button" className="slider previous" onClick={ previousSlides }>
        <IoIosArrowDropleftCircle />
      </button>

      <div className="carousel-container">
        {genre.includes('Meal')
        && (
          drinksRecommendation()
        )}
        {genre.includes('Drink')
        && (
          foodsRecommendation()
        )}

      </div>
      <button type="button" className="slider next" onClick={ nextSlides }>
        <IoIosArrowDroprightCircle />
      </button>
    </div>
  );
}

Carousel.propTypes = {
  genre: PropTypes.string.isRequired,
};
