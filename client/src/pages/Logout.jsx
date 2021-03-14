import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Logout = () => {
  const { logoutUser } = useContext(GlobalContext);
  useEffect(() => {
    logoutUser();
  }, []);
  return null;
};

export default Logout;
