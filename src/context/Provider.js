import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './ContextAPI';

function Provider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const context = { foods, drinks };
  return (
<<<<<<< HEAD
    <AppContext.Provider value={ context }>
=======
    <AppContext.Provider value={ { foods, drinks, setFoods, setDrinks } }>
>>>>>>> 7f78bcf27247a8a43a2b34f58b783efe051989de
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
