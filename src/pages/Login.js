import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';

export default function Login() {
  const {
    button,
    setButton,
    loginEmail,
    setLoginEmail,
    passoword,
    setPassoword,
  } = useContext(AppContext);

  const history = useHistory('/meals');

  const fetchButton = () => {
    const format = { email: loginEmail };
    localStorage.setItem('user', JSON.stringify(format));
    history.push('/meals');
  };

  const testLogin = () => {
    const testEmail = loginEmail.includes('@' && '.com');
    const max = 6;

    if (passoword.length >= max && testEmail) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    if (id === 'email-input') {
      setLoginEmail(value);
    } else {
      setPassoword(value);
    }
    testLogin();
  };
  return (
    <div>
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            type="text"
            id="email-input"
            placeholder="Email"
            data-testid="email-input"
            value={ loginEmail }
            onChange={ (element) => handleChange(element) }
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            type="password"
            id="password-input"
            placeholder="Password"
            data-testid="password-input"
            value={ passoword }
            onChange={ (element) => handleChange(element) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ button }
          onClick={ () => fetchButton() }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
