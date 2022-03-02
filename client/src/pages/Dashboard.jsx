import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

// styles import
import "../assets/styles/pages/dashboard.css";

// images import
import Avatar from "../assets/images/avatar.png";

// components import
import Navbar from "../components/navbar/Navbar.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";

// dashboard partials
import AddUser from "../partials/adduser/AddUser.jsx";
import ViewUsers from "../partials/viewusers/ViewUsers.jsx";

const Dashboard = () => {
  const [updatedDate, setUpdatedDate] = useState(new Date());
  const [testHour, setTestHour] = useState(new Date().getHours());
  const [greetings, setGreetings] = useState("");

  // function to extract current URL path
  const extractParams = (srch) =>
    srch
      ? JSON.parse(
          `{"${decodeURI(srch)
            .replace(/^[&,.+=%$#@]/, "")
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')}"}`
        )
      : {};

  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (!extractParams(location.search?.substring(1))?.current)
      setSelectedTab("dashboard");
    else setSelectedTab(extractParams(location.search?.substring(1))?.current);
  }, [location]);

  useEffect(() => {
    setInterval(() => {
      setUpdatedDate(new Date());
      setTestHour(new Date().getHours());
    }, 1000);
  }, []);

  useEffect(() => {
    if (testHour < 12) setGreetings("Good Morning");
    else if (testHour >= 12 && testHour <= 17) setGreetings("Good Afternoon");
    else if (testHour >= 17 && testHour <= 24) setGreetings("Good Evening");
  }, [testHour]);

  return (
    <div className="dashboard">
      <Navbar adjustPadding={true} containMenuItems={false} />
      <div className="dashboard__content relative">
        <Sidebar />
        <div className="dashboard__view absolute">
          {selectedTab === "dashboard" && (
            <>
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
              <div className="image">
                <img src={Avatar} alt="avatar" />
              </div>
              <div className="actual__profile grid gap-1 grid-3">
                <div className="card">
                  <h3 className="text-center">Full Name</h3>
                  <h4 className="text-center">Njoh Noh Prince Junior</h4>
                </div>
                <div className="card">
                  <h3 className="text-center">Email</h3>
                  <h4 className="text-center">jufredprince@gmail.com</h4>
                </div>
              </div>
            </>
          )}
          <div className="dashboard__partials">
            {selectedTab === "adduseradmin" && (
              <AddUser
                title="Add User Admin"
                buttonText="Confirm"
                selectedTab={selectedTab}
              />
            )}
            {selectedTab === "addvehicleadmin" && (
              <AddUser
                title="Add Vehicle Admin"
                buttonText="Confirm"
                selectedTab={selectedTab}
              />
            )}
            {selectedTab === "profilesettings" && (
              <AddUser
                title="Update Profile Info"
                buttonText="Confirm Update"
                selectedTab={selectedTab}
              />
            )}
            {
              selectedTab === "viewusers" && (
                <ViewUsers avatar={Avatar} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
