import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  let auth = { token: props.isAuthorized };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
