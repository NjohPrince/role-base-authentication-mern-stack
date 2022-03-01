import React from "react";
import { Link } from "react-router-dom";

import "../assets/styles/pages/auth.css";

const Register = () => {
  return (
    <div className="auth__container flex a-j-center">
      <div className="auth__form__wrapper">
        <div className="form__center">
          <form method="POST" className="auth__form">
            <div className="auth__form__head">
              <h1>Register</h1>
            </div>
            <div className="form__control relative flex">
              <input type="text" placeholder="Your Full Name" />
              <i className="fas fa-user" aria-hidden="true"></i>
            </div>
            <div className="form__control relative flex">
              <input type="password" placeholder="Your Email" />
              <i className="fas fa-envelope" aria-hidden="true"></i>
            </div>
            <div className="form__control relative flex">
              <input type="password" placeholder="Password" />
              <i className="fas fa-lock" aria-hidden="true"></i>
            </div>
            <div className="form__control relative flex">
              <input type="password" placeholder="Confirm Password" />
              <i className="fas fa-lock" aria-hidden="true"></i>
            </div>
            <div className="form__control flex a-j-space-between">
              <button type="submit">Register</button>
              <div>
                <Link to="/auth/login">Already Have An Account?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
