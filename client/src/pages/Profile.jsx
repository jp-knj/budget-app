import React, { useState, useEffect, useContext, useCallback } from 'react'
import { GlobalContext } from '../context/GlobalState'

// Material Ui
import { TextField } from '@material-ui/core'

const Profile = () => {
  const { users, updateUser } = useContext(GlobalContext);
  const [name, setName] = useState(''),
    [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (users.user) {
      const { name, email } = users.user;
      setName(name);
      setEmail(email);
    }
  }, [users.user]);

  const handleName = useCallback(
    ({ target: input }) => {
      setName(input.value);
    }, [email]
  );

  const handleEmail = useCallback(
    ({ target: input }) => {
      setEmail(input.value);
    }, [name]
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const { id } = users.user;
      const editUser = { name, email };
      updateUser(id, editUser);
      setSuccess(users.success);
    },
    [users, name, email, updateUser]
  );

  return (
    <div>
      <form>
        <TextField
          id='Name'
          label='Name'
          fullWidth
          value={name}
          required='true'
          onChange={handleName}
        />
        <TextField
          id='Email'
          label='Email'
          fullWidth
          type='email'
          value={email}
          required='true'
          onChange={handleEmail}
        />
        <button onClick={handleClick}>
          Save
        </button>
        <button onClick={handleClick}>
          Cancel
        </button>
      </form>
    </div>
  )
}
export default Profile
