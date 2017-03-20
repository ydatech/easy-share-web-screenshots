import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { Route, IndexRoute, Router, browserHistory } from 'react-router'

//components
import App from './App'
import Home from './Home'
import NotFound from './NotFound'
import Policy from './Policy'
import Tos from './Tos'
import Published from './Published'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='published' component={Published} />
      <Route path='tos' component={Tos} />
      <Route path='pp' component={Policy} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
  ,
  document.getElementById('root')
);
