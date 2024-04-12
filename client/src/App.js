import React from "react";
import Main from "./pages/tic-tac-toe/Main";
import Why from "./pages/why/Why";
import LandingPage from "./LandingPage";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/tic-tac-toe" element={<Main />} />
        <Route path="/why" element={<Why />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
