/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { useHistory } from 'react-router-dom';
import tw from 'twin.macro';
import { BiDrink } from 'react-icons/bi';
import { GiKnifeFork } from 'react-icons/gi';
import GenericHeader from '../components/GenericHeader';
import { MainContainer, PrincipalContainer } from './HTMLcomponets';
import Footer from '../components/Footer';
import './Explore.css';

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

export default function Explore() {
  const value = 'Explore';
  const history = useHistory();
  const handleClick = (page) => {
    history.push(`/${page}`);
  };
  return (

    <div className="bg-food-explore w-screen h-screen bg-cover">
      <MainContainer>
        <GenericHeader value={ value } />
        <PrincipalContainer>
          <ButtonsContainer>
            <ButtonsExplorer
              type="button"
              className="btn-explore"
              data-testid="explore-food"
              onClick={ () => handleClick('explorar/comidas') }
            >
              <h1 className="text-2xl m-1">
                <GiKnifeFork />
              </h1>
              Explore Foods
            </ButtonsExplorer>

            <ButtonsExplorer
              type="button"
              className="btn btn-explore"
              data-testid="explore-drinks"
              onClick={ () => handleClick('explorar/bebidas') }
            >
              <h1 className="text-2xl m-1">
                <BiDrink />
              </h1>
              Explore Drinks
            </ButtonsExplorer>
          </ButtonsContainer>
        </PrincipalContainer>
        <Footer />
      </MainContainer>
    </div>
  );
}
