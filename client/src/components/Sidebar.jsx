import React, { useContext, useState, useEffect, useCallback } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

// Material-UI Core
import { MenuItem, MenuList, ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Material-UI Icon
import { Add } from '@material-ui/icons'

// Context
import { GlobalContext } from '../context/GlobalState'

// Components
import TransactionForm from './TransactionForm'

const Sidebar = ({ children }) => {
  const { getToken, users, loadUser } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const token = getToken();

  useEffect(() => {
    token && loadUser();
    // eslint-disable-next-line
  }, []);

  const useStyles = makeStyles(() => ({
    addCircleIcon: {
      color: 'white'
    }
  }));

  const handleForm = useCallback(() => {
    setOpen(true);
  }, []);

  const classes = useStyles();
  return (
    <div className="wrapper">
      <div className="sidebar">
        <aside>
          <div className="introduction">
            <h3 className="introduction_date">Friday, 5 March</h3>
            <h4 className="introduction_time">Good Morning</h4>
            <h2 className="introduction_name">
              {token && users.user && users.user.name}
            </h2>
          </div>
          <nav className="navigation">
            <MenuList>
              <MenuItem to="/dashboard" component={NavLink}>
                <ListItemIcon>DashBoard</ListItemIcon>
              </MenuItem>
              <MenuItem to="/transaction" component={NavLink}>
                <ListItemIcon>Transactions</ListItemIcon>
              </MenuItem>
              <MenuItem to="/statistics" component={NavLink}>
                <ListItemIcon>Statistics</ListItemIcon>
              </MenuItem>
              <MenuItem to="/profile" component={NavLink}>
                <ListItemIcon>Profile</ListItemIcon>
              </MenuItem>
              <MenuItem to="/logout" component={NavLink}>
                <ListItemIcon>Logout</ListItemIcon>
              </MenuItem>
            </MenuList>
          </nav>
        </aside>
      </div>
      <main className="container">
        {children}
      </main>
      <TransactionForm open={open} setOpen={setOpen} />
      <div
        className="btn"
        onClick={handleForm}
      >
        <Add className={`${classes.addCircleIcon}`} />
      </div>
    </div>
  )
}

export default withRouter(Sidebar)
