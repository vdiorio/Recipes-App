import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import RecipeCard from './RecipeCard';
import ContextAPI from '../context/ContextAPI';
import './Carousel.css';
import leftArrow from '../images/leftArrow.svg';
import rightArrow from '../images/rightArrow.svg';

export default function Carousel({ genre }) {
  const { requestRecipes, foods, drinks } = useContext(ContextAPI);
  const [current, setCurrent] = useState(0);
  const MAX_CARDS = 6;

  function previousSlides() {
    const INDEX_LIMIT = 4;
    setCurrent(current === 0 ? INDEX_LIMIT : current - 2);
  }

  function nextSlides() {
    const INDEX_LIMIT = 4;
    setCurrent(current === INDEX_LIMIT ? 0 : current + 2);
  }

  function drinksRecommendation() {
    requestRecipes(MAX_CARDS, 'drink');
    return drinks.map((drink, index) => (
      <div
        key={ drink.idDrink }
        data-testid={ `${index}-recomendation-card` }
        className={
          current === index // verificando card atual
          || current + 1 === index ? `recommended active ${
              index % 2 === 0 ? 'left' : 'right' // verificando posicao do card
            }` : 'recommended'
        }
      >
        <RecipeCard
          recipe={ drink }
          index={ index }
          place="carousel"
        />
      </div>
    ));
  }

  function foodsRecommendation() {
    requestRecipes(MAX_CARDS, 'meal');
    return foods.map((food, index) => (
      <div
        key={ food.idMeal }
        data-testid={ `${index}-recomendation-card` }
        className={
          current === index // verificando card atual
          || current + 1 === index ? `recommended active ${
              index % 2 === 0 ? 'left' : 'right' // verificando posicao do card
            }` : 'recommended'
        }
      >
        <RecipeCard
          recipe={ food }
          index={ index }
        />
      </div>
    ));
  }

  return (
    <div className="carousel">
      <button type="button" className="slider previous" onClick={ previousSlides }>
        <img src={ leftArrow } alt="previous" />
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
        <img src={ rightArrow } alt="next" />
      </button>
    </div>
  );
}

Carousel.propTypes = {
  genre: PropTypes.string.isRequired,
};
