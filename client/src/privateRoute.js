import React, { useState, useEffect } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState();
  const handleAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:3001/userinfo", {
        credentials: "include",
        redirect: "manual",
      });

      const { valid } = response.data;
      console.log(response.data);
      console.log(valid);
      setIsAuthorized(valid);
      console.log(isAuthorized);
    } catch (error) {
      setIsAuthorized(false);
      console.error("Error fetching redirectPath:", error);
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      console.log("Calling handle authentication");
      handleAuthentication();
    }
  }, [isAuthorized]);

  console.log("App Authenticated: ", isAuthorized);

  const location = useLocation();
  if (isAuthorized === undefined) {
    return "Loading";
  }

  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
