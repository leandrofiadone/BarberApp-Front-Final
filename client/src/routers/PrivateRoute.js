import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  console.log("Desde PrivateRoute", isAuth);
  return (
    <Route
      component={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
};

export default PrivateRoute;
