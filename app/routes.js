import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from './components/Main'
import HelloWorld from './containers/HelloWorld'

export default (
  <Route path='/' component={Main}>
    <IndexRoute component={HelloWorld}/>
    <Route path='date/:year/:month/:day' component={HelloWorld}/>
  </Route>
)
