import React from 'react';
import './Explore.css';
import { useHistory } from 'react-router-dom';

export default function Explore() {
  const history = useHistory();
  const handleClick = (page) => {
    history.push(`/${page}`);
  };

  return (
    <div className="fourth-color d-flex flex-column explore-containter">
      <button
        type="button"
        className="btn btn-explore"
        data-testid="explore-food"
        onClick={ () => handleClick('explorar/comidas') }
      >
        Explorar Comidas
      </button>

      <button
        type="button"
        className="btn btn-explore"
        data-testid="explore-drinks"
        onClick={ () => handleClick('explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
    </div>

  );
}
