import React, { useContext, useState, useEffect, useCallback } from 'react'
import { NavLink, withRouter } from 'react-router-dom'


// Material-UI Core
import { CssBaseline, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography, MenuItem, MenuList, ListItemIcon, Fab, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'

// Material-UI Icon
import { Add } from '@material-ui/icons'

// Context
import { GlobalContext } from '../context/GlobalState'

// Components
import TransactionForm from './TransactionForm'

// Utils
import { defaultMaterialTheme } from '../utils/colorTheme'

const useStyles = makeStyles(() => ({
    addCircleIcon: {
      color: 'white'
    }
  }));

const Sidebar = ({ children }) => {
  const classes = useStyles();
  const { getToken, users, loadUser } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const token = getToken();
  const marginLeft = token ? '' : 'margin-left0'
  const handleForm = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    token && loadUser();
   }, []);

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <div className="wrapper" id='menu'>
      {token && (
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
               <MenuItem to="/transactions" component={NavLink}>
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
        )}
        <main className={`container  ${marginLeft}`}>
          {children}
        </main>
       <TransactionForm open={open} setOpen={setOpen} action='new' />
       <div
         className="button-primary"
         onClick={handleForm}
       >
         <Add className={`${classes.addCircleIcon}`} />
       </div>
     </div>
    </ThemeProvider>
  )
}

export default withRouter(Sidebar)
