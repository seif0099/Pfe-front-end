import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

function PublicRoutes({ children, shouldNotDisplayPublicRoute, ...rest }) {
const userLoggedIn = localStorage.getItem("user-info") ? true : false;
  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          userLoggedIn ? (
            <Redirect
              to={{
                pathname: "/pointage",
                state: { from: location },
              }}
            />
          ) : (
            children
          )
        }
      />
    </>
  );
}

export default PublicRoutes;
