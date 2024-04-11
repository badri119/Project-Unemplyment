import React from "react";
import Main from "./pages/tic-tac-toe/Main";
import Why from "./pages/why/Why";
import LandingPage from "./LandingPage";
import Login from "./pages/login/login";
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
      </Routes>
    </div>
  );
};

export default App;
