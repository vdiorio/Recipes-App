import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './ContextAPI';

function Provider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [showComponent, setShowComponent] = useState(false);

  const INITIAL_STATE = {
    foods,
    drinks,
    setFoods,
    setDrinks,
    showComponent,
    setShowComponent,
  };

  return (
    <AppContext.Provider value={ INITIAL_STATE }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
