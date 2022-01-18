import PropTypes from 'prop-types';
import React, { useState } from 'react';
import tw from 'twin.macro';
import './DoneRecipeCard.css';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const FoodDoneContainer = tw.div`
  border-2
  border-yellow-300
  text-gray-600
  rounded-md
  flex
  content-start
  items-center
  flex-grow
  font-family[Itim, cursive]
  m-2.5
  flex-flow[column row]
  `;
export default function DoneRecipeCard({ recipe, index }) {
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
    doneDate,
    image,
    name,
    tags,
  } = recipe;
  const link = window.location.href.split('/');
  link[3] = `${type}s`;
  link[4] = id; // Tratamento do link para o botão de compartilhamento
  return (
    <FoodDoneContainer // Container do card
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ `/${type}s/${id}` }>
        <img
          className="card-image p-1"
          src={ image }
          alt={ `${area} meal` }
          data-testid={ `${index}-horizontal-image` }
          width={ 130 }
        />
      </Link>
      <div className="w-full text-gray-700">
        {showToast}
        <div className="flex justify-between mr-3">
          <span
            data-testid={ `${index}-horizontal-top-text` }
            className="text-xl font-medium"
          >
            { `${alcoholicOrNot.length > 0 ? alcoholicOrNot : area} - ${category}` }
          </span>
          <button
            type="button"
            className="media-btn"
            onClick={ () => showIndividualToast(link.join('/')) }
            style={ { justifySelf: 'flex-end' } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Share Icon"
              className=""
            />
          </button>
        </div>
        <Link to={ `/${type}s/${id}` }>
          <h6
            data-testid={ `${index}-horizontal-name` }
            className="text-gray-600"
          >
            {name}
          </h6>
        </Link>
        <span data-testid={ `${index}-horizontal-done-date` }>
          { `Feita em: ${doneDate}` }
        </span>
        <div className="flex">
          Tags:&nbsp;
          { tags.map((tag) => (
            <div
              key={ tag }
              className="bg-yellow-200 mx-1"
              data-testid={ `0-${tag}-horizontal-tag` }
            >
              { tag }
              &nbsp;
            </div>
          )) }
        </div>
      </div>
    </FoodDoneContainer>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
