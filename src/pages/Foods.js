import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Header from '../components/Header';
import FetchFoodApi from '../helpers/FetchFoodApi';
import ContextAPI from '../context/ContextAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButtons from '../components/CategoryButtons';
import '../components/RecipeCard.css';

export default function Foods() {
  const text = 'Comidas';
  const { setFoods, foods } = useContext(ContextAPI);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setFilter] = useState('All');
  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => { // Setando os estados do context ao montar o componente
    FetchFoodApi().then((r) => {
      setFoods(r.meals.filter((_m, i) => i < MAX_CARDS));
    });
    FetchFoodApi('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((obj) => setCategories(obj.meals.filter((_c, i) => i < MAX_CATEGORIES)));
  }, [setFoods]);

  const handleFilterChange = (filter) => {
    if (filter !== categoryFilter && filter !== 'All') {
      setFoods([]);
      const URI = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
      setFilter(filter);
      FetchFoodApi(URI)
        .then(({ meals }) => setFoods(meals.filter((_r, i) => i < MAX_CARDS)));
    } else {
      setFoods([]);
      setFilter('All');
      FetchFoodApi().then((r) => {
        setFoods(r.meals.filter((_m, i) => i < MAX_CARDS));
      });
    }
  };

  return (
    <div>
      <Header text={ text } />
      {window.scroll(0, 0)}
      {
        categories.length > 0
          ? ( // Cria um container para os botões de categoria, o botão "TODOS" e mapeia as categorias de acordo com o retorno da API
            <CategoryButtons
              handleFilterChange={ handleFilterChange }
              categories={ categories }
              filter={ categoryFilter }
            />
          )
          : (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>)
      }
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
                place="main"
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
