/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import './Explore.css';
import { useHistory } from 'react-router-dom';
import tw from 'twin.macro';
import { FaRegSurprise } from 'react-icons/fa';
import GenericHeader from '../components/GenericHeader';
import Footer from '../components/Footer';
import { MainContainer, PrincipalContainer } from './HTMLcomponets';

const iconFood = 'https://cdn-icons.flaticon.com/png/512/3025/premium/3025900.png?token=exp=1642607603~hmac=1cba848c0faa67e2511b965308577e43';

const ButtonsContainer = tw.div`
  flex
  flex-col
  content-center
  items-center
  sm:flex-row
  sm:justify-center
  w-full
`;
const ButtonsExplorer = tw.button`
  bg-yellow-400
  hover:bg-yellow-500
  flex
  items-center
  justify-center

`;
export default function ExploreDrinks() {
  const [idDrinksRandom, setIdDrinksRandom] = useState();
  const value = 'Explore Drinks';

  const history = useHistory();
  const handleClick = (page) => {
    history.push(`/${page}`);
  };

  const getRandomDrinkId = async () => {
    await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((data) => data.json())
      .then((response) => setIdDrinksRandom(response.drinks[0].idDrink));
  };

  useEffect(() => {
    getRandomDrinkId();
  });

  return (
    <div className="bg-drinks w-screen h-screen bg-cover">
      <MainContainer>

        <GenericHeader value={ value } />
        <PrincipalContainer className="text-center m-1">
          <ButtonsContainer>
            <ButtonsExplorer
              type="button"
              className="btn btn-explore"
              data-testid="explore-by-ingredient"
              onClick={ () => handleClick('explorar/bebidas/ingredientes') }
            >
              <img src={ iconFood } alt="" className="w-7 h-7 m-1" />
              By Ingredients
            </ButtonsExplorer>

            <ButtonsExplorer
              type="button"
              className="btn btn-explore"
              data-testid="explore-surprise"
              onClick={ () => handleClick(`bebidas/${idDrinksRandom}`) }
            >
              <h1 className="text-2xl m-1">
                <FaRegSurprise />
              </h1>
              Surprise Me!
            </ButtonsExplorer>
          </ButtonsContainer>
        </PrincipalContainer>
        <Footer />
      </MainContainer>
    </div>
  );
}
