import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/login";
import Buy from "./components/buy";
import Error from "./components/error";
import PrivateRoute from "./privateRoute";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/error" element={<Error />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
