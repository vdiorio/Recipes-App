import PropTypes from 'prop-types';
import React from 'react';
import tw from 'twin.macro';

const NavCategories = tw.div`
  bg-white
  w-full
  flex
  content-center
  justify-center
  border-b-0
  px-3
  m-1.5
  text-gray-600

`;
export default function CategoryButtons({ handleFilterChange, categories, filter }) {
  return (// Componentização dos botões de categorias
    <NavCategories
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <label
        className="btn btn-outline-primary"
        htmlFor="All"
        data-testid="All-category-filter"
      >
        <input
          type="checkbox"
          className="btn-check m-1"
          name="btnradio"
          id="All"
          autoComplete="off"
          onChange={ (e) => handleFilterChange(e.target.id) }
          checked={ filter === 'All' }
        />
        All
        {/* <input className="btn-check" type="radio" /> */}
      </label>
      { categories.map(({ strCategory }, index) => ( // Mapeando os botões de categoria
        <div key={ `${strCategory}${index}` }>
          <label
            className="btn btn-outline-primary m-1"
            htmlFor={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
          >
            <input
              type="checkbox"
              className="btn-check ml-3"
              name="btnradio"
              id={ strCategory }
              autoComplete="off"
              onChange={ (e) => handleFilterChange(e.target.id) }
              checked={ filter === strCategory }
            />
            &nbsp;
            { strCategory }
            {/* <input className="btn-check" type="radio" /> */}
          </label>
        </div>
      )) }
    </NavCategories>
  );
}

CategoryButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func,
  })).isRequired,
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
