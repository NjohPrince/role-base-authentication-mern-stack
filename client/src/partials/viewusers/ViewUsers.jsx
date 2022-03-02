import React from "react";

// styles import
import "./viewuser.css";

const ViewUsers = ({ avatar }) => {
  const users = [
    {
      id: "6f080035feab0oiowfrerrwe",
      fullname: "Ndip Nobert",
      email: "nobert@gmail.com",
    },
    {
      id: "6e080034feab0oiowfrerrwe",
      fullname: "Njoh Noh Prince Junior",
      email: "jufredprince@gmail.com",
    },
    {
      id: "6f080034feab0oiowfrerrwe",
      fullname: "Daniel TheProgrammer",
      email: "dtpinternational@gmail.com",
    },
  ];
  return (
    <div className="view__users">
      <div className="head">
        <h2>All Users</h2>
      </div>
      <div className="subhead">
          <h3>Vehicle Admins</h3>
      </div>
      <div className="view__users__grid grid grid-3 gap-1">
        {users.length > 0 &&
          users.map((user, index) => {
            return (
              <div key={user.id + index} className="user__card">
                <div className="user__image">
                  <img src={avatar} alt={user.fullname} />
                </div>
                <div className="user__details">
                  <h3>{user.fullname}</h3>
                  <h4>{user.email}</h4>
                </div>
                <div className="actions">
                  <button>
                    <i aria-hidden="true" className="fas fa-trash"></i> Delete
                    Account
                  </button>
                  <button>
                    <i aria-hidden="true" className="fas fa-pencil-alt"></i> Edit
                    Details
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <div className="subhead">
          <h3>User Admins</h3>
      </div>
      <div className="view__users__grid grid grid-3 gap-1">
        {users.length > 0 &&
          users.map((user, index) => {
            return (
              <div key={user.id + index} className="user__card">
                <div className="user__image">
                  <img src={avatar} alt={user.fullname} />
                </div>
                <div className="user__details">
                  <h3>{user.fullname}</h3>
                  <h4>{user.email}</h4>
                </div>
                <div className="actions">
                  <button>
                    <i aria-hidden="true" className="fas fa-trash"></i> Delete
                    Account
                  </button>
                  <button>
                    <i aria-hidden="true" className="fas fa-pencil-alt"></i> Edit
                    Details
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <div className="subhead">
          <h3>Users</h3>
      </div>
      <div className="view__users__grid grid grid-3 gap-1">
        {users.length > 0 &&
          users.map((user, index) => {
            return (
              <div key={user.id + index} className="user__card">
                <div className="user__image">
                  <img src={avatar} alt={user.fullname} />
                </div>
                <div className="user__details">
                  <h3>{user.fullname}</h3>
                  <h4>{user.email}</h4>
                </div>
                <div className="actions">
                  <button>
                    <i aria-hidden="true" className="fas fa-trash"></i> Delete
                    Account
                  </button>
                  <button>
                    <i aria-hidden="true" className="fas fa-pencil-alt"></i> Edit
                    Details
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ViewUsers;
