import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import tw from 'twin.macro';
import { FaUserEdit, FaSearch } from 'react-icons/fa';
import AppContext from '../context/ContextAPI';
import HeaderSearchBar from './HeaderSearchBar';

const HeaderContinainer = tw.header`
  bg-white
  fixed
  w-screen
  top-0
  left-0
  flex
  content-center
  justify-center
  border-gray-600
  flex-col
  px-3
  z-10
`;

const HeaderNav = tw.nav`
  w-full
  h-16
  flex
  flex-row
  justify-between
  text-3xl
  items-center
  z-20
  font-family[Anton]
  sm:w-5/6
  sm:mx-auto
  sm:left-auto

`;
export default function Header({ text }) {
  const { showComponent, setShowComponent, goesTo } = useContext(AppContext);
  return (
    <HeaderContinainer>
      <HeaderNav>
        <button
          type="button"
          onClick={ () => goesTo('perfil') }
        >
          <FaUserEdit />
        </button>
        <h1 data-testid="page-title">
          { text }
        </h1>
        <button
          type="button"
          onClick={ () => setShowComponent(!showComponent) }
        >
          <FaSearch />
        </button>
      </HeaderNav>
      {
        showComponent ? (<HeaderSearchBar />) : null
      }
    </HeaderContinainer>
  );
}

Header.propTypes = {
  text: PropTypes.node.isRequired,
};
