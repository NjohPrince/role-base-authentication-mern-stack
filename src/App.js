import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import axios from "axios";
import { useLocation } from "react-router";

// alert / notifications
import Alert from "./partials/alert/Alert.js";

// pages import
import Home from "./pages/Home.page.jsx";
import Error from "./pages/Error.page.jsx";
import Login from "./pages/Login.page.jsx";
import Register from "./pages/Register.page.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// baseURL - server
const baseURL = process.env.REACT_APP_API_KEY;

const App = () => {
  const [token, setToken] = useState("");
  const location = useLocation();
  
  useEffect(() => {
    axios
      .post(`${baseURL}/get-token`)
      .then((response) => {
        console.log(response.data);
        setToken(response.data);
      })
      .catch((error) => {
        console.log(error?.error);
      });
  }, [location]);

  return (
    <div className="app">
      <Router>
        <Alert />
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
