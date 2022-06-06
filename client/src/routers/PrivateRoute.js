import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      component={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
