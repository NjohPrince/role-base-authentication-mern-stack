import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";

// pages import
import Home from "./pages/Home.page.jsx";
import Error from "./pages/Error.page.jsx";
import Login from "./pages/Login.page.jsx";
import Register from "./pages/Register.page.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          {/** WELCOME PAGE - HOME */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />

          {/** AUTH PAGES */}
          <Route exact path="/auth/login" element={<Login />} />
          <Route exact path="/auth/register" element={<Register />} />

          {/** DASHBOARD */}
          <Route exact path="/dashboard" element={<Dashboard />} />

          {/** Error Page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
