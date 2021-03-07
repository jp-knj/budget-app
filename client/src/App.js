import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
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
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
          <ProtectedRoute path='/dashboard' component={Dashboard} />
          <ProtectedRoute path='/transactions' component={Transactions} />
          <ProtectedRoute path='/statistics' component={Statistics} />
          <ProtectedRoute path='/profile' component={Profile} />
          <Redirect from='/' exact to='/dashboard' />
          <Redirect to='/not-found' />
        </Switch>
      </Sidebar>
    </GlobalProvider>
  )
}
export default App
