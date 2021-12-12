import React, { useContext, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Header from '../components/Header';
import FetchDrinkAPI from '../helpers/FetchDrinkAPI';
import ContextAPI from '../context/ContextAPI';
import RecipeCard from '../components/RecipeCard';

export default function Foods() {
  const { setDrinks, drinks } = useContext(ContextAPI);

  useEffect(() => { // Setando os estados do context ao montar o componente
    const MAX = 12;
    FetchDrinkAPI().then((r) => {
      setDrinks(r.drinks.filter((_m, i) => i < MAX));
    });
  }, [setDrinks]);

  return (
    <div>
      <Header />
      <div
        className="card-container"
        style={ {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        } }
      >
        {
          drinks.length > 0
            ? drinks.map((drink, index) => (
              <RecipeCard
                recipe={ drink }
                key={ drink.idDrink }
                index={ index }
              />
            ))
            : (
              <ReactLoading
                type="spinningBubbles"
                color="cyan"
                height={ 30 }
                width={ 30 }
              />)
        }
      </div>
    </div>
  );
}
