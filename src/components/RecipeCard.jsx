import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import tw from 'twin.macro';

const ImgCard = tw.img`
rounded-2xl
p-0
w-80
h-52
object-cover
sm:w-96
sm:h-64
`;
const LinkContainer = tw.button`
text-decoration[none]
p-0
m-4
`;

const TextFoodCard = tw.h6`
  text-left
  m-2
  sm:text-2xl
  text-gray-600 
  font-family[Itim, cursive]
`;
export default function RecipeCard({ recipe, index, place }) {
  const recipeType = recipe.idDrink ? 'Drink' : 'Meal'; // Detecta se está recebendo drinks ou comidas
  const linkReference = recipe.idDrink ? 'bebidas' : 'comidas'; // Detecta se está recebendo drinks ou comidas
  const name = recipe[`str${recipeType}`]; // Acessa a propriedade de acordo com o tipo de receita recebido
  const image = recipe[`str${recipeType}Thumb`];
  const id = recipe[`id${recipeType}`];
  const history = useHistory();

  const handleClick = (link) => {
    history.push(link);
  };

  return (
    <LinkContainer
      type="button"
      className={ place === 'main' ? 'card' : 'recommended-card' }
      onClick={ () => handleClick(`/${linkReference}/${id}`) }
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
    </LinkContainer>
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
