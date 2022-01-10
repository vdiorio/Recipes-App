import React from 'react';
import { useHistory } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';

function WelcomePage() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/login');
  };

  const BackgroudPage = styled.main`
    background-size: cover;

    ${tw`
    w-screen
    h-screen
    `}
  `;

  const Container = styled.div` 

    ${tw`
    w-screen
    h-screen
    bg-black
    bg-opacity-25
    flex
    flex-col
    justify-center
    content-between
    `}
  `;

  const WelcomeContainer = styled.div` 

    ${tw`
    mt-28
    bg-opacity-25
    flex
    self-center
    justify-center
    `}
  `;

  const Title = styled.div` 
    text-shadow: 5px 5px 15px black;

    ${tw`
    m-3
    text-5xl
    text-white
    text-center
    shadow-2xl
    font-family[Anton]
    `}
  `;
  const SubTitle = styled.div` 
    text-shadow: 5px 5px 15px black;

    ${tw`
    text-2xl
    m-3
    text-white
    text-center
    shadow-2xl
    font-family[Arial, Helvetica, sans-serif]
    `}
  `;
  const ButtonStart = styled.button` 
    ${tw`
     bg-yellow-300
     w-48
     h-10
     rounded-3xl
     font-bold 
     drop-shadow-lg
    `}
  `;
  return (
    <BackgroudPage className="bg-food-welcome">
      <Container>
        <SubTitle>Welcome to</SubTitle>
        <Title>Recipes App</Title>
        <WelcomeContainer>
          <ButtonStart
            type="button"
            onClick={ () => handleClick() }
          >
            Start Cooking
          </ButtonStart>
        </WelcomeContainer>
      </Container>
    </BackgroudPage>
  );
}
export default WelcomePage;
