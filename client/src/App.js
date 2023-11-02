import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/login";
import Buy from "./components/buy";
import Error from "./components/error";

// import logo from './logo.svg';
import './App.css';

function App() {
  const handleLoginClick = () => {
    // Fetch the redirectPath from the backend
    fetch("http://localhost:3001/auth/discord/callback", {
      credentials: "include", // Include credentials in the request
      redirect: "manual", // Handle redirects manually
    })
      .then((response) => {
        // Redirect manually to the received location
        window.location.href = response.url;
      })
      .catch((error) => {
        console.error("Error fetching redirectPath:", error);
        // Handle errors if necessary
      });
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLoginClick} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/error" element={<Error />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
