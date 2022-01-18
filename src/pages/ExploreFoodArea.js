import React, { useEffect, useState, useContext } from 'react';
import ReactLoading from 'react-loading';
import tw from 'twin.macro';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { MainContainer } from './HTMLcomponets';
import './Explore.css';
import RecipeCard from '../components/RecipeCard';
import ContextAPI from '../context/ContextAPI';
import FetchFoodApi from '../helpers/FetchFoodApi';

const CategoriesContainer = tw.div`
  w-full
  bg-white
  fixed
  top-16
  flex
  justify-center
  sm:w-5/6
  font-family[Itim, cursive]
`;

const CardsContainer = tw.div`
  w-full
  flex
  flex-col
  mt-32
  justify-between
  items-center
  sm:flex-row
  sm:flex-wrap
`;
export default function ExploreFoodArea() {
  const value = 'Explore By Local';
  const [areaOfFoods, setAreaOfFoods] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const { setFoods, foods } = useContext(ContextAPI);
  const MAX_CARDS = 12;

  useEffect(() => { // Setando os estados do context ao montar o componente
    if (selectedArea === 'All') {
      FetchFoodApi().then((r) => {
        setFoods(r.meals.filter((_m, i) => i < MAX_CARDS));
      });
    } else {
      const urlFoodsArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
      FetchFoodApi(urlFoodsArea).then((r) => {
        setFoods(r.meals.filter((_m, i) => i < MAX_CARDS));
      });
    }
  }, [selectedArea, setFoods]);

  const getFoodsArea = async () => {
    await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((data) => data.json())
      .then((response) => setAreaOfFoods(response.meals));
  };

  useEffect(() => {
    getFoodsArea();
  });

  return (
    <MainContainer>
      <Header text={ value } />

      <CategoriesContainer>
        <select
          className="w-32 rounded-xl h-8 p-1 m-1"
          data-testid="explore-by-area-dropdown"
          id="selectArea"
          value={ selectedArea }
          onChange={ ({ target }) => setSelectedArea(target.value) }
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          { areaOfFoods
            ? areaOfFoods.map((areas) => (
              <option
                key={ areas.strArea }
                data-testid={ `${areas.strArea}-option` }
                value={ areas.strArea }
              >
                {areas.strArea}
              </option>
            ))
            : <option> - </option>}
        </select>

      </CategoriesContainer>
      <div className="w-full flex justify-center">
        <CardsContainer className="content-center">
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
        </CardsContainer>
      </div>
      <Footer />
    </MainContainer>
  );
}
