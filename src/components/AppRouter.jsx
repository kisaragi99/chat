/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { context as Context } from '../context';
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return user
    ? (
      <Switch>
        {privateRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            component={Component}
            exact
          />
        ))}
        <Redirect to={CHAT_ROUTE} />
      </Switch>
    )
    : (
      <Switch>
        {publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            component={Component}
            exact
          />
        ))}
        <Redirect to={LOGIN_ROUTE} />
      </Switch>
    );
};

export default AppRouter;
