import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from './components/Header';
import Routes from './Routes.jsx';
import Footer from './components/Footer';
import * as actions from './utils/actions';

import './app.scss';

class App extends Component {
  componentWillMount() {
    this.props.fetchConfig();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Routes />
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(App)
);
