import React from "react";
import { Link } from "react-router-dom";

import "../assets/styles/pages/auth.css";

const Login = () => {
  return (
    <div className="auth__container flex a-j-center">
      <div className="auth__form__wrapper">
        <div className="form__center">
          <form method="POST" className="auth__form">
            <div className="auth__form__head">
              <h1>Login</h1>
            </div>
            <div className="form__control relative flex">
              <input type="text" placeholder="Email" />
              <i className="fas fa-envelope" aria-hidden="true"></i>
            </div>
            <div className="form__control relative flex">
              <input type="password" placeholder="Password" />
              <i className="fas fa-lock" aria-hidden="true"></i>
            </div>
            <div className="form__control flex a-j-space-between">
              <div></div>
              <div>
                <Link to="/forgot-password">Forgot Password</Link>
              </div>
            </div>
            <div className="form__control flex a-j-space-between">
              <button type="submit">Login</button>
              <div>
                <Link to="/auth/register">Don't Have An Account?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
