import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'

const initialState = {
  users: [],
  token: null,
  error: null,
  loading: true
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider context
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getToken = () => {
    return localStorage.getItem('token');
  }

  axios.defaults.headers.common["x-auth-token"] = getToken();
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  // Action
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
        payload: err.response
      });
    }
  }

  async function loginUser(user) {
    try {
      const res = await axios.post('/api/auth', user, config);
      dispatch({
        type: 'LOGIN_USER',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response.data
      });
    }
  }

  function logoutUser() {
    dispatch({
      type: 'LOGOUT_USER',
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        users: state.users,
        error: state.error,
        loading: state.loading,
        registerUser,
        loginUser,
        logoutUser,
        getToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
