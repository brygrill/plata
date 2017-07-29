// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import fire from './fire';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import StravaAuthPage from './pages/StravaAuthPage';
import NotFound from './pages/NotFoundPage';

import { PrivateRoute, PublicRoute, NoMatchRoute } from './routes';

import LogoLoader from './components/LogoLoader';

// Render App
export default class App extends Component {
  state = {
    loading: true,
    authed: false,
    user: {
      uid: null,
    },
  };

  componentDidMount() {
    console.log('App - CDM');
    this.listenForAuthChange();
  }

  listenForAuthChange = () => {
    return fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loading: false,
          authed: true,
          user: { uid: user.uid },
        });
      } else {
        this.setState({ loading: false, authed: false, user: { uid: null } });
      }
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <LogoLoader loading={loading} />
        <Router>
          <div>
            <Switch>
              <PublicRoute
                path="/"
                exact
                appState={this.state}
                component={HomePage}
              />
              <PrivateRoute
                path="/dashboard"
                appState={this.state}
                component={DashboardPage}
              />
              <PrivateRoute
                path="/strava"
                appState={this.state}
                component={StravaAuthPage}
              />
              <NoMatchRoute appState={this.state} component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
