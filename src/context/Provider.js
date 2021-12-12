import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './ContextAPI';

function Provider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  return (
    <AppContext.Provider value={ { foods, drinks, setFoods, setDrinks } }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
