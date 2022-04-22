import React from 'react'
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

function AdminRoutes({children, ...rest }) {
    const adminLoggedIn = localStorage.getItem("admin-info") ? true : false;
    return (
        <Route
        {...rest }
          render={
            ({ location }) => (
                adminLoggedIn
                ? (
                  children
                ) : (
                  <Redirect
                    to={{
                      pathname: '/admin-signin',
                      state: { from: location }
                    }}
                  />
                ))
          }
        />
      );
}

export default AdminRoutes