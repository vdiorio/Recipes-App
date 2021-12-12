import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({ recipe, index }) {
  const recipeType = recipe.idDrink ? 'Drink' : 'Meal'; // Detecta se está recebendo drinks ou comidas
  const name = recipe[`str${recipeType}`]; // Acessa a propriedade de acordo com o tipo de receita recebido
  const image = recipe[`str${recipeType}Thumb`];
  const id = recipe[`id${recipeType}`];
  return (
    <Link
      className="card hover"
      style={ { width: '45%', marginBottom: 10 } }
      to={ `/comidas/${id}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        className="card-img-top"
        src={ image }
        alt={ `${recipe.strArea} meal` }
        data-testid={ `${index}-card-img` }
      />
      <h5
        className="card-title"
        data-testid={ `${index}-card-name` }
      >
        {name}
      </h5>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
  }).isRequired,
};
