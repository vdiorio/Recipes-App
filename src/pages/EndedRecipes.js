import React, { useEffect, useState } from 'react';
import GenericHeader from '../components/GenericHeader';
import DoneRecipeCard from '../components/DoneRecipeCard';
import { CategoriesContainer,
  MainContainer,
  NavCategories,
  PrincipalContainer } from './HTMLcomponets';
import Footer from '../components/Footer';

export default function EndedRecipes() {
  const [doneRecipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { // Ao montar o componente, recupera as receitas no localstorage e as salva no estado
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(recipes);
  }, []);

  const value = 'Receitas Feitas';
  const categorias = ['all', 'food', 'drink']; // Array para economizar código repetitivo

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
              <div key={ i } className="m-3">
                <input
                  type="checkbox"
                  className="btn-check"
                  name="btnradio"
                  id={ cat }
                  autoComplete="off"
                  onChange={ () => setFilter(filterName) }
                  checked={ filter === filterName }
                />
                <label
                  className="btn btn-outline-primary mx-2"
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
        { Array.isArray(doneRecipes) && doneRecipes // Sem checar se recipes done é um array a pagina falhava em alguns testes
          .filter((rec) => filter === 'all' || rec.type === filter)
          .map((rec, i) => (
            <DoneRecipeCard key={ i } recipe={ rec } index={ i } />
          )) }
      </PrincipalContainer>
      <Footer />

    </MainContainer>
  );
}
