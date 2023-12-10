import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/login";
import Buy from "./components/buy";
import Error from "./components/error";
import PrivateRoute from "./privateRoute";
import axios from "axios";

import "./App.css";

function App() {
  /*
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  let authenticationInterval;
  let url = "";
  const handleAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:3001/userinfo", {
        credentials: "include",
        redirect: "manual",
      });

      const { valid, redirectTo } = response.data;

      console.log(response.data);

      if (valid) {
        setIsAuthorized(true);

        if (redirectTo) {
          url = "http://localhost:3000" + redirectTo;
        } else {
          console.error("Missing redirectTo value in the JSON response");
        }

        // Clear the interval when authentication is successful
        clearInterval(authenticationInterval);
      } else {
        console.error("Authentication not valid");
        clearInterval(authenticationInterval);
        url = "http://localhost:3000" + redirectTo;
      }
      if (window.location.href != url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error fetching redirectPath:", error);
      // Handle error appropriately
    }
  };

  // Use useEffect for better control and cleanup
  useEffect(() => {
    // Invoke the authentication function initially
    handleAuthentication();

    // Set up the interval
    const authenticationInterval = setInterval(() => {
      handleAuthentication();
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(authenticationInterval);
  }, []); // Empty dependency array ensures the effect runs only once on mount


*/
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute /*isAuthenticated={isAuthorized}*/ />}>
        <Route element={<Home />} path="/home" exact />
      </Route>

      <Route path="/buy" element={<Buy />} />
      <Route path="/error" element={<Error />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
