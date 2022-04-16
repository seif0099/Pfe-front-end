import React from 'react'
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

function PrivateRoutes({children, ...rest }) {
    const userLoggedIn = localStorage.getItem("user-info") ? true : false;
    return (
        <Route
        {...rest }
          render={
            ({ location }) => (
                userLoggedIn
                ? (
                  children
                ) : (
                  <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: location }
                    }}
                  />
                ))
          }
        />
      );
}

export default PrivateRoutes