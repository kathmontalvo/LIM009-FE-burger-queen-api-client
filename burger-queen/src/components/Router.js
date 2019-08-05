import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Orders from './Products'
import Home from './Home'
import Login from './Login'
import cocina from './Cocina/index'
import ProtectedRoute from '../controller/routes/protected-route'

const Routes = () => {
  return (
    // <Router>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/' } component={Login} />
        <ProtectedRoute exact path={process.env.PUBLIC_URL + '/orders' } component={Orders} />
        <ProtectedRoute exact path='/home' component={Home} />
        <ProtectedRoute exact path='/cocina' component={cocina} />
        <Route path = '*' component={()=> '404 NOT FOUND'} />
      </Switch>
    // </Router >x
  )
}

export default Routes;