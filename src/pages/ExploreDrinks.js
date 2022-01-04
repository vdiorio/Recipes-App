import React, { useEffect, useState } from 'react';
import './Explore.css';
import { useHistory } from 'react-router-dom';

export default function ExploreDrinks() {
  const [idDrinksRandom, setIdDrinksRandom] = useState();

  const history = useHistory();
  const handleClick = (page) => {
    history.push(`/${page}`);
  };
  const getRandomDrinkId = async () => {
    await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((data) => data.json())
      .then((response) => setIdDrinksRandom(response.meals[0].idMeal));
  };

  useEffect(() => {
    getRandomDrinkId();
  });

  return (
    <div className="text-center m-1">
      <h2>Explorar Bebidas</h2>
      <div className="fourth-color d-flex flex-column explore-containter">
        <button
          type="button"
          className="btn btn-explore"
          data-testid="explore-by-ingredient"
          onClick={ () => handleClick('explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          className="btn btn-explore"
          data-testid="explore-surprise"
          onClick={ () => handleClick(`bebidas/${idDrinksRandom}`) }
        >
          Me Surpreenda!
        </button>
      </div>
    </div>

  );
}
