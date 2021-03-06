import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'

const initialState = {
  users: [],
  token: null,
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getToken = () => {
    return localStorage.getItem('token');
  }

  axios.defaults.headers.common["x-auth-token"] = getToken();

  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  async function registerUser(user) {
    try {
      const res = await axios.post('/api/users', user, config);
      dispatch({
        type: 'REGISTER_USER',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response.data
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        users: state.users,
        error: state.error,
        loading: state.loading,
        registerUser,
        getToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
