import React from "react";
import Main from "./pages/tic-tac-toe/Main";
import Why from "./pages/why/Why";
import LandingPage from "./LandingPage";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/SignUp";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Topics from "./pages/topics/Topics";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/why" element={<Why />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/topics" element={<Topics />} />
          <Route exact path="/tic-tac-toe" element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
