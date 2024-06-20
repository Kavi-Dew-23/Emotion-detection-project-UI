import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}
export default App;
