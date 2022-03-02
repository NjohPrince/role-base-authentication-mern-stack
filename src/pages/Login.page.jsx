import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../assets/styles/pages/auth.css";

// redux - app state components import
import { login } from "../redux/actions/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const { loading, isAuthenticated } = user;

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated");
    }
  }, [isAuthenticated]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { email, password } = formData;

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="auth__container flex a-j-center">
      <div className="auth__form__wrapper">
        <div className="form__center">
          <form method="POST" className="auth__form" onSubmit={submitForm}>
            <div className="auth__form__head">
              <h1>Login</h1>
            </div>
            <div className="form__control relative flex">
              <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email"
              />
              <i className="fas fa-envelope" aria-hidden="true"></i>
            </div>
            <div className="form__control relative flex">
              <input
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
              />
              <i className="fas fa-lock" aria-hidden="true"></i>
            </div>
            <div className="form__control flex a-j-space-between">
              <div></div>
              <div>
                <Link to="/#">Forgot Password</Link>
              </div>
            </div>
            <div className="form__control flex a-j-space-between">
              <button
                disabled={loading}
                style={{
                  opacity: loading ? "0.5" : "1",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                type="submit"
              >
                Login
              </button>
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
