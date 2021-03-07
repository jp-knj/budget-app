import React, { useContext, useState, useCallback } from 'react'
import { GlobalContext } from '../context/GlobalState'

import { TextField } from '@material-ui/core'

const Login = () => {
  const { registerUser } = useContext(GlobalContext);
  const [name, setName] = useState('kenji'),
        [email, setEmail] = useState('sample001@email.com'),
        [password, setPassword] = useState('password1234');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      registerUser({ name, email, password });
    },
    [name, email, password]
  );

  const handleChange = useCallback((e) => {
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

  return (
      <form>
        <TextField
          id='Name'
          label='Name'
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
export default Login
