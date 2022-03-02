import React, { useState, useEffect } from "react";

// styles import
import "../assets/styles/pages/dashboard.css";

// components import
import Navbar from "../components/navbar/Navbar.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";

const Dashboard = () => {
  const [updatedDate, setUpdatedDate] = useState(new Date());
  const [testHour, setTestHour] = useState(new Date().getHours());
  const [greetings, setGreetings] = useState("");

  useEffect(() => {
    setInterval(() => {
      setUpdatedDate(new Date());
      setTestHour(new Date().getHours());
    }, 3000);
  }, []);

  useEffect(() => {
    if (testHour < 12)
        setGreetings("Good Morning");
    else if (testHour >= 12 && testHour <= 17)
        setGreetings("Good Afternoon");
    else if (testHour >= 17 && testHour <= 24)
        setGreetings("Good Evening");
  }, [testHour]);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard__content relative">
        <Sidebar />
        <div className="dashboard__view absolute">
          <div className="profile">
            <h2>{greetings}, Prince Junior</h2>
            <h3>
              Date:{" "}
              {updatedDate.toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>
            <h3>
              Time:{" "}
              {updatedDate.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
