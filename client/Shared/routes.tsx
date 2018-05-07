
import * as React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component, exact = false, name = "", path, authenticated }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      authenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}
  />
);
