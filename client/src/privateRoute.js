import React, { useState, useEffect } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState();
  const [isAuthFetched, setIsAuthFetched] = useState();

  const handleAuthentication = async () => {
    try {
      console.log("Handle Authentication called");
      const response = await axios.get("/userinfo", {
        credentials: "include",
        redirect: "manual",
      });
      console.log(response.data);
      const { valid } = response.data;
      setIsAuthorized(valid);
      setIsAuthFetched(true);
    } catch (error) {
      setIsAuthorized(false);
      setIsAuthFetched(true);
      console.error("Error fetching redirectPath:", error);
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      handleAuthentication();
    }
  }, [isAuthorized]);

  const location = useLocation();
  console.log(isAuthorized);
  if (!isAuthFetched) {
    return "Loading";
  }
  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
