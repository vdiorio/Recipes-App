import React, { useContext, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Header from '../components/Header';
import FetchFoodApi from '../helpers/FetchFoodApi';
import ContextAPI from '../context/ContextAPI';
import RecipeCard from '../components/RecipeCard';

export default function Foods() {
  const { setFoods, foods } = useContext(ContextAPI);

  useEffect(() => { // Setando os estados do context ao montar o componente
    const MAX = 12;
    FetchFoodApi().then((r) => {
      setFoods(r.meals.filter((_m, i) => i < MAX));
      console.log(r.meals);
    });
  }, [setFoods]);

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
          foods.length > 0
            ? foods.map((food, index) => (
              <RecipeCard
                recipe={ food }
                key={ food.idMeal }
                index={ index }
              />))
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
