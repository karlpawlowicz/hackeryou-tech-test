import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Home from './pages/Home';
import Movie from './components/Movie';

export const routes = [
  { path: '/', component: Home },
  { path: '/movie/:id', component: Movie }
];

const genKey = path => `route:${path}`;

class Router extends Component {
  render() {
    return (
      <Switch>
        {routes.map(config => (
          <Route exact {...config} key={genKey(config.path)} />
        ))}
      </Switch>
    );
  }
}

export default Router;
