import React from 'react';
import { Link } from 'react-router-dom';

// styles import
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar absolute">
        <div className="sidebar__item">
            <Link to="/dashboard?current=addvehicleadmin">
                <i className="fas fa-plus" aria-hidden="true"></i>
                <h4>Add Vehicle Admin</h4>
            </Link>
            <Link to="/dashboard?current=adduseradmin">
                <i className="fas fa-plus" aria-hidden="true"></i>
                <h4>Add User Admin</h4>
            </Link>
            <Link to="/dashboard?current=viewusers">
                <i className="fas fa-eye" aria-hidden="true"></i>
                <h4>View Users</h4>
            </Link>
            <Link to="/dashboard?current=viewvehicles">
                <i className="fas fa-eye" aria-hidden="true"></i>
                <h4>View Vehicles</h4>
            </Link>
        </div>
    </div>
  )
};

export default Sidebar;