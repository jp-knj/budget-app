import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

// Material-UI Core
import { MenuItem, MenuList, ListItemIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Material-UI Icon
import { Add } from '@material-ui/icons'

const Sidebar = ({ children }) => {
  const useStyles = makeStyles(() => ({
    addCircleIcon: {
      color: 'white'
    }
  }));
  const classes = useStyles();
  return (
    <div className="wrapper">
      <div className="sidebar">
        <aside>
          <div className="">
            <h3>Friday, 5 March</h3>
            <h4>Good Morning</h4>
            <h2>Kenji Tomita</h2>
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
      <div className="btn">
        <Add className={`${classes.addCircleIcon}`} />
      </div>
    </div>
  )
}

export default withRouter(Sidebar)
