import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login"
import VideoCapture from "./pages/Private/VideoCapture";
import Results from "./pages/Private/Result"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/videoCapture" element={<VideoCapture/>}/>
        <Route path="/results" element={<Results/>}/>
      </Routes>
    </Router>
  );
}
export default App;
