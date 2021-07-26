import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuthUser } from '../../hooks/useAuthUser';

export type AuthenticatedRouteProps = {
  onlyPublic?: boolean;
} & RouteProps;

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({
  children,
  onlyPublic = false,
  ...routeProps
}) => {
  const user = useAuthUser();

  return (
    <Route
      {...routeProps}
      render={({ location }) => {
        if (onlyPublic) {
          return !user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          )
        }

        return user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }}
    />
  );
};

export default AuthenticatedRoute;
