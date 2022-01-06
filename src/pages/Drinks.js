import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchDrinkAPI from '../helpers/FetchDrinkAPI';
import ContextAPI from '../context/ContextAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButtons from '../components/CategoryButtons';
import '../components/RecipeCard.css';

export default function Drinks() {
  const text = 'Bebidas';
  const { setDrinks, drinks } = useContext(ContextAPI);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setFilter] = useState('All');
  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => { // Setando os estados do context ao montar o componente
    FetchDrinkAPI().then((r) => {
      setDrinks(r.drinks.filter((_m, i) => i < MAX_CARDS));
    });
    FetchDrinkAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((obj) => setCategories(obj.drinks.filter((_c, i) => i < MAX_CATEGORIES)));
  }, [setDrinks]);

  const handleFilterChange = (filter) => {
    if (filter !== categoryFilter && filter !== 'All') {
      setDrinks([]);
      const URI = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
      setFilter(filter);
      FetchDrinkAPI(URI)
        .then((resp) => setDrinks(resp.drinks.filter((_r, i) => i < MAX_CARDS)));
    } else {
      setDrinks([]);
      setFilter('All');
      FetchDrinkAPI().then((r) => {
        setDrinks(r.drinks.filter((_m, i) => i < MAX_CARDS));
      });
    }
  };

  return (
    <div>
      <Header text={ text } />
      {
        categories.length > 0
          ? ( // Cira um container para os botões de categoria, o botão "TODOS" e mapeia as categorias de acordo com o retorno da API
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
          drinks.length > 0
            ? drinks.map((drink, index) => (
              <RecipeCard
                recipe={ drink }
                key={ drink.idDrink }
                index={ index }
                place="main"
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
      <Footer />
    </div>
  );
}
