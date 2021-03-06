import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalState.jsx'

// Pages
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Statistics from './pages/Statistics'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Logout from './pages/Logout'

// Components
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <GlobalProvider>
      <Sidebar>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/transactions' component={Transactions} />
          <Route path='/statistics' component={Statistics} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </Sidebar>
    </GlobalProvider>
  )
}
export default App
