import React, { useEffect, useState } from "react";
import axios from "axios";

const Loading = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const authenticationInterval = 5000;
  const handleAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:3000/userinfo", {
        credentials: "include",
        redirect: "manual",
      });

      const { valid, redirectTo } = response.data;

      console.log(response.data);
      if (valid) {
        setIsAuthorized(true);

        if (redirectTo) {
          window.location.href = "http://localhost:3000" + redirectTo;
        } else {
          console.error("Missing redirectTo value in the JSON response");
        }

        // Clear the interval when authentication is successful
        clearInterval(authenticationInterval);
      } else {
        console.error("Authentication not valid");
        window.location.href = "http://localhost:3000" + redirectTo;
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

  return (
    <div>
      <h1>Loading...</h1>
      <p>Validating subscription status...</p>
    </div>
  );
};

export default Loading;
