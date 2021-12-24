import PropTypes from 'prop-types';
import React from 'react';

export default function CategoryButtons({ handleFilterChange, categories, filter }) {
  return (// Componentização dos botões de categorias
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="checkbox"
        className="btn-check"
        name="btnradio"
        id="All"
        autoComplete="off"
        onChange={ (e) => handleFilterChange(e.target.id) }
        checked={ filter === 'All' }
      />
      <label
        className="btn btn-outline-primary"
        htmlFor="All"
        data-testid="All-category-filter"
      >
        All
        <input className="btn-check" type="radio" />
      </label>
      { categories.map(({ strCategory }, index) => ( // Mapeando os botões de categoria
        <div key={ `${strCategory}${index}` }>
          <input
            type="checkbox"
            className="btn-check"
            name="btnradio"
            id={ strCategory }
            autoComplete="off"
            onChange={ (e) => handleFilterChange(e.target.id) }
            checked={ filter === strCategory }
          />
          <label
            className="btn btn-outline-primary"
            htmlFor={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
          >
            { strCategory }
            <input className="btn-check" type="radio" />
          </label>
        </div>
      )) }
    </div>
  );
}

CategoryButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func,
  })).isRequired,
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
