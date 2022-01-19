import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import tw from 'twin.macro';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchFoodApi from '../helpers/FetchFoodApi';
import ContextAPI from '../context/ContextAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButtons from '../components/CategoryButtons';
import '../components/RecipeCard.css';

const MainContainer = tw.main`
  w-screen
  h-screen
  flex
  flex-col
  content-center
  sm:w-5/6
  sm:mx-auto
`;

const CategoriesContainer = tw.div`
  w-full  
  fixed
  top-14
  flex
  justify-center
  sm:w-5/6
`;
const CardsContainer = tw.div`
  w-full
  flex
  flex-col
  mt-32
`;

const CardsFoodDiv = tw.div`
  w-full
  h-full
  flex
  flex-row
  flex-wrap
  justify-evenly

`;

export default function Foods() {
  const { setFoods, foods, exploreFoods,
    historyString, setHistoryString } = useContext(ContextAPI);
  const text = 'Foods Recipes';
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
    setHistoryString('');
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

  function whatToRender() {
    console.log(document.referrer);
    return historyString.includes('/explorar/comidas/ingredientes')
      ? exploreFoods.map((food, index) => (
        <RecipeCard
          recipe={ food }
          key={ `${food.idMeal}${index}` }
          index={ index }
          place="main"
        />))
      : (
        foods.map((food, index) => (
          <RecipeCard
            recipe={ food }
            key={ food.idMeal }
            index={ index }
            place="main"
          />))
      );
  }

  return (
    <MainContainer>
      <Header text={ text } />
      <CategoriesContainer>
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

      </CategoriesContainer>
      <CardsContainer>
        <CardsFoodDiv>
          {
            foods.length > 0
              ? whatToRender() : (
                <ReactLoading
                  type="spinningBubbles"
                  color="cyan"
                  height={ 30 }
                  width={ 30 }
                />)
          }

        </CardsFoodDiv>
        <div className="w-full h-16" />
      </CardsContainer>
      <Footer />
    </MainContainer>
  );
}
