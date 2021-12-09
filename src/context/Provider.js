import PropTypes from 'prop-types';
import React from 'react';
import AppContext from './ContextAPI';

function Provider({ children }) {
  const [foods] = useState([]);
  const [drinks] = useState([]);

  return (
    <AppContext.Provider value={ { foods, drinks } }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
