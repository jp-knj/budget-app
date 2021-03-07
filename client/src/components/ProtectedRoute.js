import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const { getToken } = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (!getToken()) return <Redirect to='/login' />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
