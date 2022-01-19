import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import tw from 'twin.macro';
import { useLocation, useHistory } from 'react-router-dom';
import fetchDrinkAPI from '../helpers/FetchDrinkAPI';
import './DrinksIngredients.css';
import GenericHeader from '../components/GenericHeader';
import Footer from '../components/Footer';
import contextAPI from '../context/ContextAPI';
import { MainContainer } from './HTMLcomponets';

const PrincipalContainer = tw.div`
w-full
flex
my-32
items-center
font-family[Itim, cursive]
flex-row
flex-wrap
justify-around
`;

const ImgCard = tw.img`
rounded-2xl
p-0
w-24
sm:w-40
`;
const LinkContainer = tw.button`
p-0
m-4
border-2
border-yellow-200
flex
flex-col
items-center
w-40
sm:w-60
`;

const TextFoodCard = tw.h6`
  text-center
  m-2
  sm:text-2xl
  text-gray-600 
  font-family[Itim, cursive]
`;

export default function DrinksIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { setExploreDrinks, setHistoryString } = useContext(contextAPI);
  const location = useLocation();
  const CARDS_LIMIT = 12;
  const value = 'Explore By Ingredients';
  const history = useHistory();

  function setByIngredient(ingredientName) {
    setHistoryString(location.pathname);
    fetchDrinkAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`).then((r) => {
      setExploreDrinks(r.drinks.filter((_m, i) => i < CARDS_LIMIT));
    });
  }

  useEffect(() => {
    fetchDrinkAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((response) => setIngredientsList(response.drinks
        .filter((_item, index) => index < CARDS_LIMIT)));
  }, []);

  const handleClick = (link) => {
    setByIngredient(link);
    history.push('/bebidas');
  };

  return (
    <MainContainer>
      <GenericHeader value={ value } />
      <PrincipalContainer>
        {
          ingredientsList
            ? ingredientsList.map((ingredient, index) => (
              <LinkContainer
                type="button"
                className="ingredient"
                key={ index }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => handleClick(ingredient.strIngredient1) }

              >
                <ImgCard
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                  alt={ ingredient.strIngredient1 }
                  data-testid={ `${index}-card-img` }
                />
                <TextFoodCard
                  data-testid={ `${index}-card-name` }
                >
                  {ingredient.strIngredient1}
                </TextFoodCard>
              </LinkContainer>
            ))
            : (
              <ReactLoading
                type="spinningBubbles"
                color="cyan"
                height={ 30 }
                width={ 30 }
              />)
        }
      </PrincipalContainer>
      <Footer />
    </MainContainer>
  );
}
