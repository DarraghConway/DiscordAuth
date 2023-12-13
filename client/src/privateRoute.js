import React, { useEffect } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const location = useLocation();
  useEffect(() => {
    console.log("PrivateRoute Authenticated (Effect):", props.isAuthenticated);
  }, [props.isAuthenticated]);

  return props.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
