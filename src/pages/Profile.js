/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import { GrRestaurant, GrFavorite } from 'react-icons/gr';
import { BiLogOut } from 'react-icons/bi';
import tw from 'twin.macro';
import Footer from '../components/Footer';
import GenericHeader from '../components/GenericHeader';

const ButtonsProfile = tw.button`
  bg-yellow-400
  hover:bg-yellow-500
  flex
  items-center
  justify-center

`;
const PrincipalContainer = tw.div`
w-full
flex
flex-col
mt-32
items-center
font-family[Itim, cursive]

`;

export default function Profile() {
  const value = 'Profile';
  const localStorageReturn = localStorage.getItem('user');
  const { email } = localStorageReturn === null ? '' : JSON.parse(localStorageReturn);

  return (
    <div
      className="bg-food-profile w-screen h-screen bg-cover absolute bg-center"
    >
      <GenericHeader value={ value } />
      <PrincipalContainer>
        <h2 data-testid="profile-email" className="text-white text-xl">
          Email: &nbsp;
          { email }
        </h2>
        <div className="flex flex-col sm:flex-row mt-4">
          <Link to="/receitas-feitas">
            <ButtonsProfile
              data-testid="profile-done-btn"
              type="button"
              className="btn-explore"

            >
              <h1 className="text-2xl m-1">
                <GrRestaurant />
              </h1>
              Recipes Done
            </ButtonsProfile>
          </Link>
          <Link to="/receitas-favoritas">
            <ButtonsProfile
              data-testid="profile-favorite-btn"
              type="button"
              className="btn-explore"

            >
              <h1 className="text-2xl m-1">
                <GrFavorite />
              </h1>
              Favorites
            </ButtonsProfile>
          </Link>
          <Link to="/">
            <ButtonsProfile
              data-testid="profile-logout-btn"
              type="button"
              className="btn-explore"
              onClick={ () => localStorage.clear() }
            >
              <h1 className="text-2xl m-1">
                <BiLogOut />
              </h1>
              Log out
            </ButtonsProfile>
          </Link>
        </div>
        <Footer />
      </PrincipalContainer>
    </div>
  );
}
