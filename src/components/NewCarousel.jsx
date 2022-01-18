/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
// import tw from 'twin.macro';
import RecipeCard from './RecipeCard';
import './Carousel.css';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import fetchDrinkAPI from '../helpers/FetchDrinkAPI';

let count = 0;
export default function NewCarousel({ genre }) {
  const [recommended, setRecommended] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [current, setCurrent] = useState(0);
  const MAX_CARDS = 6;
  const handleOnNextClick = () => {
    count = (count + 1) % recommended.length;
    setCurrentIndex(count);
  };

  const handleOnPrevClick = () => {
    count = (count + 1) % recommended.length;
    setCurrentIndex(count);
  };

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

  return (

    recommended.length > 0
      ? (
        <div className="max-w-screen-xl m-auto">
          <div className="w-full relative select-none">
            <RecipeCard
              recipe={ recommended[currentIndex] }
              index={ currentIndex }
              place="carousel"
            />

            <div
              className="absolute w-full
           top-1/2 transform -translate-y-1/2
          flex justify-between items-start px-3"
            >
              <button
                type="button"
                className="text-3xl h-28 bg-slate-300 bg-opacity-30 "
                onClick={ handleOnPrevClick }
              >

                <h3>
                  <IoIosArrowDropleftCircle />
                </h3>

              </button>
              <button
                type="button"
                className="text-3xl h-28 bg-slate-300 bg-opacity-30 "
                onClick={ handleOnNextClick }
              >
                <h3>
                  <IoIosArrowDroprightCircle />

                </h3>

              </button>
            </div>
          </div>
        </div>
      )
      : null
  );
}

NewCarousel.propTypes = {
  genre: PropTypes.string.isRequired,
};
