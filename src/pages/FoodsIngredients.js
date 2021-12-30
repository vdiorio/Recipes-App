import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import fetchFoodAPI from '../helpers/FetchFoodApi';
import './DrinksIngredients.css';

export default function FoodsIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const CARDS_LIMIT = 12;
  useEffect(() => {
    fetchFoodAPI('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((response) => setIngredientsList(response.meals
        .filter((_item, index) => index < CARDS_LIMIT)));
  }, []);

  return (
    <div>
      <div className="ingredients-list">
        <h1>
          ExploreIngredients
        </h1>
        {
          ingredientsList
            ? ingredientsList.map((ingredient, index) => (
              <div
                className="ingredient"
                key={ index }
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  className="ingredient-img"
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
                  alt={ ingredient.strIngredient }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className="ingredient-name"
                >
                  {ingredient.strIngredient}
                </p>
              </div>
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
