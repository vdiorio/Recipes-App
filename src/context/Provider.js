import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './ContextAPI';

function Provider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const context = { foods, drinks, setFoods, setDrinks };
  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
