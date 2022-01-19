/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './DoneRecipeCard.css';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipeCard({ recipe, index, removeFavorite }) {
  const [showToast, setShowToast] = useState(
    <span className="copied-link">Link copiado!</span>,
  );

  // Função criada separadamente pq o toast gerado no context ativaria para todos os cards simultaneamente
  function showIndividualToast(link) {
    const THREE_SECONDS = 3000;
    copy(link);
    setShowToast(
      <span className="copied-link copied-link--active">Link copiado!</span>,
    );
    return setTimeout(() => {
      setShowToast(
        <span className="copied-link">Link copiado!</span>,
      );
    }, THREE_SECONDS);
  }

  const {
    type,
    id,
    category,
    alcoholicOrNot,
    area,
    image,
    name,
  } = recipe;
  const link = window.location.href.split('/');
  link[3] = `${type}s`;
  link[4] = id; // Tratamento do link para o botão de compartilhamento
  return (
    <div // Container do card
      className=" rounded-lg border-2 border-yellow-300 m-2
       flex flex-col text-gray-600 w-64 p-2 items-center"
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ `/${type}s/${id}` }>
        <img
          className="w-40"
          src={ image }
          alt={ `${area} meal` }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="w-full text-center">
        <span data-testid={ `${index}-horizontal-top-text` }>
          { `${alcoholicOrNot.length > 0 ? alcoholicOrNot : area} - ${category}` }
        </span>
        <div className="flex items-center flex-row justify-center">
          <Link to={ `/${type}s/${id}` }>
            <h6 data-testid={ `${index}-horizontal-name` } className="text-gray-600">
              {name}
            </h6>
          </Link>
          <div className="mx-5 flex flex-row justify-around">
            <button
              type="button"
              onClick={ () => showIndividualToast(link.join('/')) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share Icon"
                className="w-6 mx-2"
              />
            </button>
            {showToast}
            <button
              type="button"
              onClick={ () => removeFavorite(index) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="Share Icon"
                className="w-7 mx-2"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  removeFavorite: PropTypes.func.isRequired,
};
