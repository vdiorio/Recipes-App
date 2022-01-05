import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Explore.css';
import GenericHeader from '../components/GenericHeader';

export default function ExploreFoods() {
  const [idFoodRandom, setIdFoodRandom] = useState();

  const history = useHistory();
  const value = 'Explorar Comidas';

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
    <div>
      <GenericHeader value={ value } />
      <div className="text-center m-1">
        <h2>Explorar Comida</h2>
        <div className="fourth-color d-flex flex-column explore-containter">
          <button
            type="button"
            className="btn btn-explore"
            data-testid="explore-by-ingredient"
            onClick={ () => handleClick('explorar/comidas/ingredientes') }
          >
            Por Ingredientes
          </button>

          <button
            type="button"
            className="btn btn-explore"
            data-testid="explore-by-area"
            onClick={ () => handleClick('explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
          <button
            type="button"
            className="btn btn-explore"
            data-testid="explore-surprise"
            onClick={ () => handleClick(`comidas/${idFoodRandom}`) }
          >
            Me Surpreenda!
          </button>
        </div>
      </div>
    </div>
  );
}
