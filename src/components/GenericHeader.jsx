import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import { FaUserEdit } from 'react-icons/fa';
import AppContext from '../context/ContextAPI';
import './Header.css';

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
        <div className="w-screen text-center fixed left-0">
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
