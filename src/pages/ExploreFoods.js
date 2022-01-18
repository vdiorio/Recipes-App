/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import tw from 'twin.macro';
import { MdLocalLibrary } from 'react-icons/md';
import { FaRegSurprise } from 'react-icons/fa';
import './Explore.css';
import GenericHeader from '../components/GenericHeader';
import Footer from '../components/Footer';
import { MainContainer, PrincipalContainer } from './HTMLcomponets';

const iconFood = 'https://cdn-icons-png.flaticon.com/512/985/985515.png';

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

export default function ExploreFoods() {
  const [idFoodRandom, setIdFoodRandom] = useState();

  const history = useHistory();
  const value = 'Explore Foods';

  const handleClick = (page) => {
    history.push(`/${page}`);
  };

  const getRandomFoodId = async () => {
    await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((data) => data.json())
      .then((response) => setIdFoodRandom(response.meals[0].idMeal));
  };

  useEffect(() => {
    getRandomFoodId();
  });

  return (
    <div className="bg-foods w-screen h-screen bg-cover">
      <MainContainer>
        <GenericHeader value={ value } />
        <PrincipalContainer className="text-center m-1">
          <ButtonsContainer>
            <ButtonsExplorer
              type="button"
              className="btn btn-explore"
              data-testid="explore-by-ingredient"
              onClick={ () => handleClick('explorar/comidas/ingredientes') }
            >
              <img src={ iconFood } alt="" className="w-7 h-7 m-1" />
              By Ingredients
            </ButtonsExplorer>

            <ButtonsExplorer
              type="button"
              className="btn btn-explore"
              data-testid="explore-by-area"
              onClick={ () => handleClick('explorar/comidas/area') }
            >
              <h1 className="text-2xl m-1">
                <MdLocalLibrary />
              </h1>
              By Origin Local
            </ButtonsExplorer>
            <ButtonsExplorer
              type="button"
              className="btn btn-explore"
              data-testid="explore-surprise"
              onClick={ () => handleClick(`comidas/${idFoodRandom}`) }
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
