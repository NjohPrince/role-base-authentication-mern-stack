import React from "react";

// components import
import Navbar from "../components/navbar/Navbar.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard__view">
            <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
