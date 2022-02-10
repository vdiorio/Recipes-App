import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';
import { SaveLocalStorage } from '../helpers/SaveLocalStorage';

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

const FormContainer = styled.form` 

  ${tw`
  mt-10
  bg-opacity-25
  flex
  flex-col
  self-center
  content-center
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

const ButtonLogin = styled.button` 
  ${tw`
    bg-yellow-300
    enabled:border-yellow-500
    border-2
    disabled:bg-yellow-200
    w-48
    h-10
    rounded-3xl
    font-bold 
    drop-shadow-lg
    self-center
    
  `}
`;

const LabelForm = styled.label` 
  ${tw`
    text-white
    font-bold 
    drop-shadow-lg
    flex
    flex-col
    m-2
    text-lg
  `}
`;

const InputContainer = styled.input` 
  ${tw`      
    rounded-xl
    h-8
    px-3
    mt-2
    text-black
  `}
`;

function Login() {
  const [email, setEmail] = useState('any@email.com');
  const [password, setPassword] = useState('anypassword');
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const history = useHistory();

  const isDisabled = () => {
    const passwordSize = 5;
    const passwordLength = password.length > passwordSize;
    const re = /^([\w._-]+)@([\w-]+)\.([\w]{2,8})(\.[\w]{2,8})?$/i;
    const validateEmail = re.test(String(email));
    // Regex from StackoverFlow - Email validation
    if (passwordLength && validateEmail) {
      setIsButtonDisable(false);
    } else {
      setIsButtonDisable(true);
    }
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
    isDisabled();
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    isDisabled();
  };

  const handleClick = () => {
    SaveLocalStorage(email);
    history.push('/comidas');
  };

  return (
    <BackgroudPage className="bg-food-welcome">
      <Container>
        <Title>Recipes App</Title>
        <SubTitle>LOGIN</SubTitle>
        <FormContainer>
          <LabelForm htmlFor="email">
            Email:
            <InputContainer
              type="email"
              id="email"
              name="email"
              data-testid="email-input"
              placeholder="Email"
              value={ email }
              onChange={ handleChangeEmail }
              disabled
            />
          </LabelForm>
          <LabelForm htmlFor="password">
            Password:
            <InputContainer
              type="password"
              id="password"
              name="password"
              data-testid="password-input"
              placeholder="Password"
              value={ password }
              onChange={ handleChangePassword }
              disabled
            />
          </LabelForm>
          <ButtonLogin
            type="button"
            data-testid="login-submit-btn"
            disabled={ isButtonDisable }
            onClick={ () => handleClick() }
          >
            SIGN IN
          </ButtonLogin>
        </FormContainer>
      </Container>
    </BackgroudPage>
  );
}

export default Login;
