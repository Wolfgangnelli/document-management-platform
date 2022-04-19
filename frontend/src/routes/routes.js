import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Docs from "../Pages/Docs";
import Doc from "../Pages/Doc/Doc";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/index";
import Singup from "../Pages/Singup/index";
import Profile from "../Pages/Profile/index";
import { PrivateRoute } from "../containers/privateRoute";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/docs" exact component={Docs} />
      <Route path="/login" exact component={Login} />
      <Route path="/singup" exact component={Singup} />
      <PrivateRoute path="/profile" exact component={Profile} />
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="/docs/:name/:title/:id/:pk">
        <Doc />
      </PrivateRoute>
    </Switch>
  );
}
