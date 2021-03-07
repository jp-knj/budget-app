import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Logout = () => {
  const { logoutUser } = useContext(GlobalContext);
  useEffect(() => {
    logoutUser();
    // eslint-disable-next-line
  }, []);
  return null;
};

export default Logout;
