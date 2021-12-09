import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SaveLocalStorage from '../helpers/SaveLocalStorage';
import rockGlass from '../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisable, setIsButtonDisable] = useState(true);
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

    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <form className="d-flex flex-column">
        <label htmlFor="email">
          E-mail&nbsp;
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ handleChangeEmail }
          />
        </label>
        <label htmlFor="password">
          Password &nbsp;
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            placeholder="Password"
            onChange={ handleChangePassword }
          />
        </label>
        &nbsp;
        <button
          className="btn btn-primary"
          type="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisable }
          onClick={ () => handleClick() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
