import React, { useContext } from 'react';
import AppContext from '../context/ContextAPI';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const { goesTo } = useContext(AppContext);

  return (
    <footer data-testid="footer">
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
    </footer>
  );
}
