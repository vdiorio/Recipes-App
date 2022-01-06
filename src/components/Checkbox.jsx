import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../context/ContextAPI';

export default function Checkbox({ ingNumber, arrayOfData, arrayWithPath }) {
  const { getCurrentProgress } = useContext(AppContext);
  const [checked, setChecked] = useState(true);
  const type = arrayWithPath[0];
  const urlID = arrayWithPath[1];

  useEffect(() => {
    const objInLocal = localStorage.getItem('inProgressRecipes');
    const objInLocalConverted = objInLocal !== null ? JSON.parse(objInLocal) : {};
    const ingredients = Array.from(document.getElementsByClassName('ingredient-step'));
    for (let index = ingNumber; index === ingNumber; index += 1) {
      if (objInLocalConverted[type] !== undefined
          && objInLocalConverted[type][urlID] !== undefined
          && objInLocalConverted[type][urlID].includes(index)) {
        setChecked(false);
      } else { setChecked(true); }
      if (ingredients[index].checked) {
        ingredients[index].parentElement.classList.add('ingredient-step--checked');
      } else {
        ingredients[index].parentElement.classList.remove('ingredient-step--checked');
      }
    }
  }, [ingNumber, type, urlID]);

  function handleClick() {
    getCurrentProgress();
    setChecked(!checked);
  }

  return (

    <label
      htmlFor={ `${ingNumber}ingredient-step` }
      data-testid={ `${ingNumber}-ingredient-step` }
    >
      <input
        type="checkbox"
        className="ingredient-step"
        id={ `${ingNumber}ingredient-step` }
        onChange={ handleClick }
        checked={ checked }
      />
      {` ${
        arrayOfData[0][ingNumber]} - ${
        arrayOfData[1][ingNumber] === null
          ? 'to your taste' : arrayOfData[1][ingNumber]} `}

    </label>

  );
}

Checkbox.propTypes = {
  arrayOfData: PropTypes.arrayOf(PropTypes.array).isRequired,
  arrayWithPath: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingNumber: PropTypes.number.isRequired,
};
