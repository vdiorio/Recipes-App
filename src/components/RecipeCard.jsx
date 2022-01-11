import PropTypes from 'prop-types';
import React from 'react';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

const ImgCard = tw.img`
rounded-2xl
w-full
h-28
`;

const TextFoodCard = tw.h6`
  text-gray-600 
  font-family[Itim, cursive]
`;
export default function RecipeCard({ recipe, index, place }) {
  const recipeType = recipe.idDrink ? 'Drink' : 'Meal'; // Detecta se está recebendo drinks ou comidas
  const linkReference = recipe.idDrink ? 'bebidas' : 'comidas'; // Detecta se está recebendo drinks ou comidas
  const name = recipe[`str${recipeType}`]; // Acessa a propriedade de acordo com o tipo de receita recebido
  const image = recipe[`str${recipeType}Thumb`];
  const id = recipe[`id${recipeType}`];
  return (
    <Link
      className={ place === 'main' ? 'card' : 'recommended-card' }
      to={ `/${linkReference}/${id}` }
      data-testid={ `${index}-recipe-card` }
    >
      <ImgCard
        className={ place === 'main' ? 'card-img-top' : 'recommended-image' }
        src={ image }
        alt={ `${recipe.strArea} meal` }
        data-testid={ `${index}-card-img` }
      />
      <TextFoodCard
        data-testid={
          place === 'main' ? `${index}-card-name` : `${index}-recomendation-title`
        }
      >
        {name}
      </TextFoodCard>
    </Link>
  );
}

RecipeCard.propTypes = {
  place: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
  }).isRequired,
};
