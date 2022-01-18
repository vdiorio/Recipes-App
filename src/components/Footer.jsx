import React, { useContext } from 'react';
import tw from 'twin.macro';
import AppContext from '../context/ContextAPI';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const FooterContainer = tw.header`
w-full
bottom-0
left-0
flex
content-center
justify-between
flex-row
p-3
sm:w-5/6
sm:mx-auto
sm:left-auto
`;
const FooterBar = tw.header`
bg-white
fixed
w-screen
bottom-0
left-0
flex
content-center
justify-between
flex-row
opacity-50
hover:opacity-100
`;

export default function Footer() {
  const { goesTo } = useContext(AppContext);

  return (
    <FooterBar>
      <FooterContainer data-testid="footer">
        <button type="button" onClick={ () => goesTo('bebidas') }>
          <img
            src={ drinkIcon }
            alt="Taça de vidro com limão na borda"
            data-testid="drinks-bottom-btn"
          />
        </button>
        <button type="button" onClick={ () => goesTo('explorar') }>
          <img src={ exploreIcon } alt="Bússola" data-testid="explore-bottom-btn" />
        </button>
        <button type="button" onClick={ () => goesTo('comidas') }>
          <img src={ mealIcon } alt="Garfo e faca" data-testid="food-bottom-btn" />
        </button>
      </FooterContainer>
    </FooterBar>
  );
}
