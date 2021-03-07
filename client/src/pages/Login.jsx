import React, { useContext, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

// Material UI
import { TextField } from '@material-ui/core'

const Login = () => {
  const { getToken, loginUser } = useContext(GlobalContext);
  const [email, setEmail] = useState('sample001@email.com'),
  [password, setPassword] = useState('password1234');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      loginUser({ email, password });
    },
    // eslint-disable-next-line
    [ email, password]
  );

  const handleChange = useCallback((e) => {
    // eslint-disable-next-line
    switch (e.target.id) {
      case 'Email':
        setEmail(e.target.value);
        break;
      case 'Password':
        setPassword(e.target.value);
        break;
    }
  }, []);

  if(getToken()) return <Redirect to='/' />;

  return (
    <form>
      <TextField
        id='Email'
        label='Email'
        type='email'
        required='true'
        value={email}
        onChange={handleChange}
      />
      <TextField
        id='Password'
        label='Password'
        type='password'
        required='true'
        value={password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Login</button>
    </form>
  )
}

export default Login
