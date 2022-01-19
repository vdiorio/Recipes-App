import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import GenericHeader from '../components/GenericHeader';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import { CategoriesContainer, MainContainer, NavCategories } from './HTMLcomponets';

const PrincipalContainer = tw.div`
w-full
flex
my-32
items-center
font-family[Itim, cursive]
flex-row
flex-wrap
justify-around
`;

export default function FavoriteRecipes() {
  const [favoriteRecipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { // Ao montar o componente, recupera as receitas no localstorage e as salva no estado
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(recipes);
  }, []);

  const value = 'My Favorites Recipes';
  const categorias = ['all', 'food', 'drink']; // Array para economizar código repetitivo

  async function removeFavorite(index) {
    const filteredArray = [...favoriteRecipes].filter((_rec, i) => i !== index);
    setRecipes(filteredArray);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredArray));
  }

  return (
    <MainContainer>
      <GenericHeader value={ value } />
      <CategoriesContainer // Container dos botões de filtro tentei usar os mesmos da página inicial, mas os testes existem id's e tratamentos difernetes
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <NavCategories>
          { categorias.map((cat, i) => {
            let filterName = cat === 'food' ? 'comida' : 'bebida'; // o filtro está sendo salvo no localStorage com os nomes em portugues
            if (cat === 'all') filterName = cat; // para poder filtrar corretamente criei essa lógica para simplificar o estado do filtro
            return (
              <div key={ i }>
                <input
                  type="checkbox"
                  className="m-3"
                  name="btnradio"
                  id={ cat }
                  autoComplete="off"
                  onChange={ () => setFilter(filterName) }
                  checked={ filter === filterName }
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor={ cat }
                  data-testid={ `filter-by-${cat}-btn` }
                >
                  { cat }
                </label>
              </div>
            );
          }) }
        </NavCategories>
      </CategoriesContainer>
      <PrincipalContainer>
        { Array.isArray(favoriteRecipes) && favoriteRecipes // Sem checar se recipes done é um array a pagina não carrega em alguns testes
          .filter((rec) => filter === 'all' || rec.type === filter)
          .map((rec, i) => (
            <FavoriteRecipeCard
              key={ i }
              recipe={ rec }
              index={ i }
              removeFavorite={ (id) => removeFavorite(id) }
            />
          )) }
      </PrincipalContainer>
    </MainContainer>
  );
}
