import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./components/login";
import Buy from "./components/buy";
import Error from "./components/error";
import PrivateRoute from "./privateRoute";
import axios from "axios";

import "./App.css";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const handleAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:3001/userinfo", {
          credentials: "include",
          redirect: "manual",
        });

        const { valid, redirectTo } = response.data;

        if (isMounted) {
          if (valid) {
            setIsAuthorized(true);

            if (redirectTo) {
              navigate(redirectTo, { replace: true });
            } else {
              console.error("Missing redirectTo value in the JSON response");
            }
          } else {
            setIsAuthorized(false);
            console.error("Authentication not valid");
          }
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthorized(false);
          console.error("Error fetching redirectPath:", error);
        }
      }
    };

    if (!isAuthorized) {
      handleAuthentication();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthorized, navigate]);

  console.log("App Authenticated: ", isAuthorized);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/error" element={<Error />} />
      <Route path="/" element={<PrivateRoute isAuthenticated={isAuthorized} />}>
        <Route element={<Home />} path="/home" />
      </Route>
    </Routes>
  );
}

export default App;
