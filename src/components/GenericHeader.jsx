import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import { FaUserEdit } from 'react-icons/fa';
import AppContext from '../context/ContextAPI';
import './Header.css';

const HeaderContinainer = tw.header`
  bg-white
  fixed
  w-full
  top-0
  left-0
  mx-3
  z-10
`;

const HeaderNav = tw.nav`
  w-full
  h-14
  flex
  flex-row
  text-center
  text-3xl
  items-center
  z-20
  font-family[Anton]

`;
export default function GenericHeader({ value }) {
  const { goesTo } = useContext(AppContext);

  return (
    <HeaderContinainer>
      <HeaderNav>
        <button
          type="button"
          onClick={ () => goesTo('perfil') }
        >
          <FaUserEdit />
        </button>
        <div className="w-full text-center absolute">
          <h1 data-testid="page-title">
            { value }
          </h1>
        </div>
      </HeaderNav>
    </HeaderContinainer>
  );
}

GenericHeader.propTypes = {
  value: PropTypes.node.isRequired,
};
