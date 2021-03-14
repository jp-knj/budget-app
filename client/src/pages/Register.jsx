import React, { useContext, useState, useCallback } from 'react'
import { Redirect, Link } from 'react-router-dom'
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

  if (getToken()) return <Redirect to='/' />;

  return (
      <form>
        <h1 className="heading-secondary negative">
          Register
        </h1>
        <TextField
          id='Name'
          label='Name'
          type='text'
          required='true'
          value={name}
          className='form_input'
          onChange={handleChange}
        />
        <TextField
          id='Email'
          label='Email'
          type='email'
          required='true'
          value={email}
          className='form_input'
          onChange={handleChange}
        />
        <TextField
          id='Password'
          label='Password'
          type='password'
          required='true'
          value={password}
          className='form_input'
          onChange={handleChange}
        />
        <button
          className="button-secondary"
          onClick={handleSubmit}
        >
          Register
        </button>
        <Link to="/" className="form_link"> Already have accounts? </Link>
      </form>
  )
}
export default Register
