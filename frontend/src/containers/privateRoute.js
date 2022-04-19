import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ContextUser } from "../App/App";

export const PrivateRoute = (props) => {
  const [isLogged] = useContext(ContextUser);

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{ pathname: "/login", state: { from: props.location.pathname } }}
    />
  );
};
