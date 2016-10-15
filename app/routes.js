import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from './components/Main'
import HelloWorld from './containers/HelloWorld'
import Login from './containers/Login'
import Admin from './containers/Admin'

export default (
  <Route path='/' component={Main}>
    <IndexRoute component={HelloWorld}/>
    <Route path='date/:year/:month/:day' component={HelloWorld}/>
    <Route path='login' component={Login}/>
    <Route path='admin' component={Admin}/>
  </Route>
)
