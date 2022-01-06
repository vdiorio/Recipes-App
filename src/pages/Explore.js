import React from 'react';
import { useHistory } from 'react-router-dom';
import GenericHeader from '../components/GenericHeader';
import Footer from '../components/Footer';
import './Explore.css';

export default function Explore() {
  const value = 'Explorar';
  const history = useHistory();
  const handleClick = (page) => {
    history.push(`/${page}`);
  };
  return (
    <div>
      <GenericHeader value={ value } />
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
      <Footer />
    </div>
  );
}
