import React, { useContext, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

import { TextField } from '@material-ui/core'

const Register = () => {
  const { getToken, registerUser } = useContext(GlobalContext);
  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      registerUser({ name, email, password });
    },
    // eslint-disable-next-line
    [name, email, password]
  );

  const handleChange = useCallback((e) => {
    // eslint-disable-next-line
    switch (e.target.id) {
      case 'Name':
        setName(e.target.value);
        break;
      case 'Email':
        setEmail(e.target.value);
        break;
      case 'Password':
        setPassword(e.target.value);
        break;
    }
  }, []);

  if (getToken()) return <Redirect to='/' />;

  return (
      <form>
        <TextField
          id='Name'
          label='Name'
          type='text'
          required='true'
          value={name}
          onChange={handleChange}
        />
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
        <button onClick={handleSubmit}>Register</button>
      </form>
  )
}
export default Register
