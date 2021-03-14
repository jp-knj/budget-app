import React, { useContext, useState, useEffect, useCallback } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

// Material-UI Core
import { CssBaseline, AppBar, Drawer, Hidden, IconButton, Typography, MenuItem, MenuList, ListItemIcon, Fab, Zoom } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles'

// Material-UI Icon
import { Add } from '@material-ui/icons'
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp'
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp'
import EqualizerSharpIcon from '@material-ui/icons/EqualizerSharp'
import MeetingRoomSharpIcon from '@material-ui/icons/MeetingRoomSharp'
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp'

// Context
import { GlobalContext } from '../context/GlobalState'

// Components
import TransactionForm from './TransactionForm'

// Utils
import { checkDayTime } from '../utils/calculation.js';
import { defaultMaterialTheme } from '../utils/colorTheme'

const Sidebar = ({ children, location: { pathname } }) => {
  const { getToken, users, loadUser } = useContext(GlobalContext);
  const [mobileOpen, setMobileOpen] = useState(false),
        [open, setOpen] = useState(false);
  const token = getToken();
  const marginLeft = token ? '' : 'margin-left0'

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      boxShadow: 'none',
      [theme.breakpoints.up('sm')]: {
        width: token && `calc(100% - ${drawerWidth}px)`,
        marginLeft: token && drawerWidth,
        display: token ? 'none' : 'default',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white',
    },
    drawerPaper: {
      width: drawerWidth,
      background: dayTime ? '#EAEBED' : '#232c2d',
    },
    content: {
      flexGrow: 1,
      marginTop: '55px',
      [theme.breakpoints.up('sm')]: {
        marginTop: 0,
      },
    },
    textColor: {
      color: dayTime ? '#232c2d' : 'white',
      opacity: 0.8,
    },
    selectedColor: {
      color: '#65bcbf',
      fontWeight: 800,
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      boxShadow: 'none',
    },
    addCircleIcon: {
      color: 'white'
    },
  }));

  const drawerWidth = 240;
  const handleForm = useCallback(() => {
    setOpen(true);
  }, []);

  const now = new Date(),
        dayTime = checkDayTime(now);
  const theme = useTheme();
  const transition = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const showAddButton =
    token !== null && pathname !== '/profile' && pathname !== '/statistics';
  const delay = { transitionDelay: `${showAddButton ? transition.exit : 0}ms` };
  const classes = useStyles();
  const iconSize = { fontSize: '25px' };
  const drawerList = [
    {
      name: 'dashboard',
      icon: <DashboardSharpIcon style={iconSize} />,
    },
    {
      name: 'transactions',
      icon: <LibraryBooksSharpIcon style={iconSize} />,
    },
    {
      name: 'statistics',
      icon: <EqualizerSharpIcon style={iconSize} />,
    },
    {
      name: 'profile',
      icon: <AccountBoxSharpIcon style={iconSize} />,
    },
    {
      name: 'logout',
      icon: <MeetingRoomSharpIcon style={iconSize} />,
    },
  ];
  const getCurrentTitle = (pathname) => {
    for (let i = 0; i < drawerList.length; i++) {
      if ('/' + drawerList[i]['name'] === pathname)
        return drawerList[i]['name'];
    }
  };

  const handleClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  useEffect(() => {
    token && loadUser();
   }, []);

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <div className="wrapper" id='menu'>
        {token && (
          <div>
            <Drawer
              open={mobileOpen}
              onClose={handleOpen}
              classes={{ paper: classes.drawerPaper }}
            >
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
                {drawerList.map(({ name, icon }) => {
                  const path = '/' + name;
                  const itemColor = (path) => {
                  if (path === pathname) return classes.selectedColor;
                    return classes.textColor;
                  };
                  return (
                    <MenuItem
                      key={name}
                      to={path}
                      component={NavLink}
                      selected={path === pathname}
                      style={{ minHeight: '48px' }}
                      onClick={handleClose}
                    >
                      <ListItemIcon className={itemColor(path)} style={{ minWidth: '35px' }}>
                        {icon}
                      </ListItemIcon>
                      <p className={itemColor(path)} style={{ fontSize: '14px' }}>{name}</p>
                    </MenuItem>
                      );
                    })}
                </MenuList>
              </nav>
            </aside>
         </Drawer>
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
                {drawerList.map(({ name, icon }) => {
                  const path = '/' + name;
                  const itemColor = (path) => {
                  if (path === pathname) return classes.selectedColor;
                    return classes.textColor;
                  };
                  return (
                    <MenuItem
                      key={name}
                      to={path}
                      component={NavLink}
                      selected={path === pathname}
                      style={{ minHeight: '48px' }}
                      onClick={handleClose}
                    >
                      <ListItemIcon className={itemColor(path)} style={{ minWidth: '35px' }}>
                        {icon}
                      </ListItemIcon>
                      <p className={itemColor(path)} style={{ fontSize: '14px' }}>{name}</p>
                    </MenuItem>
                      );
                    })}
                </MenuList>
              </nav>
            </aside>
          </div>
        </div>
        )}
        <main className={`container  ${marginLeft}`}>
          <div className="header_top">
            <div className="header_container">
              <IconButton
                aria-label='open drawer'
                edge='start'
                onClick={handleOpen}
              >
                <MenuIcon className={`${classes.addCircleIcon}`}/>
              </IconButton>
              <h4>
                {getCurrentTitle(pathname)}
              </h4>
            </div>
          </div>
          {children}
        </main>
        <TransactionForm open={open} setOpen={setOpen} action='new' />
        <Zoom in={showAddButton} timeout={transition} style={delay} unmountOnExit>
          <div
            className="button-primary"
            onClick={handleForm}
          >
            <Add className={`${classes.addCircleIcon}`} />
          </div>
        </Zoom>
     </div>
    </ThemeProvider>
  )
}

export default withRouter(Sidebar)
