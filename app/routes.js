import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from './components/Main'
import HelloWorld from './containers/HelloWorld'
import Login from './containers/Login'
import Admin from './containers/Admin'
import AdminEvent from './containers/AdminEvent'
import About from './containers/About'

export default (
  <Route path='/' component={Main}>
    <IndexRoute component={HelloWorld}/>
    <Route path='date/:year/:month/:day' component={HelloWorld}/>
    <Route path='login' component={Login}/>
    <Route path='about' component={About}/>
    <Route path='admin' component={Admin}/>
    <Route path='admin/events/:id' component={AdminEvent}/>
  </Route>
)
