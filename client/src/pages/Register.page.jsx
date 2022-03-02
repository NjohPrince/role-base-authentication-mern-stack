import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// styles import
import "../assets/styles/pages/auth.css";

// redux - app state components import
import { signup } from "../redux/actions/auth";

// alert
import { setAlert } from "../redux/actions/alert";

const Register = ({
  dashboardView,
  buttonText,
  title,
  actionToBePerformed,
  selectedTab,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
    role: "",
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
  const { name, email, oldPassword, password, confirmPassword, role } =
    formData;

  const submitForm = (e) => {
    e.preventDefault();

    if (confirmPassword === password) {
      dispatch(signup(name, email, password, role));
    } else {
      dispatch(setAlert("Passwords mismatch", "error"));
    }
  };

  return (
    <div
      className={`auth__container ${dashboardView ? "" : "flex a-j-center"}`}
    >
      <div className="auth__form__wrapper">
        <div className="form__center">
          <form method="POST" className="auth__form" onSubmit={submitForm}>
            <div className="auth__form__head">
              <h1>{title ? title : "Register"}</h1>
            </div>
            <div className="form__control relative flex">
              <input
                name="name"
                value={name}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
              />
              <i className="fas fa-user" aria-hidden="true"></i>
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
            {selectedTab === "profilesettings" && (
              <div className="form__control relative flex">
                <input
                  name="oldPassword"
                  value={oldPassword}
                  onChange={onChange}
                  type="password"
                  placeholder="Old Password"
                />
                <i className="fas fa-lock" aria-hidden="true"></i>
              </div>
            )}
            <div className="form__control relative flex">
              <input
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder={`${
                  selectedTab === "profilesettings"
                    ? "New Password"
                    : "Password"
                }`}
              />
              <i className="fas fa-lock" aria-hidden="true"></i>
            </div>
            <div className="form__control relative flex">
              <input
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                type="password"
                placeholder={`${
                  selectedTab === "profilesettings"
                    ? "Confirm New Password"
                    : "Confirm Password"
                }`}
              />
              <i className="fas fa-lock" aria-hidden="true"></i>
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
                {buttonText ? buttonText : "Register"}
              </button>
              {!dashboardView && (
                <div>
                  <Link to="/auth/login">Already Have An Account?</Link>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
