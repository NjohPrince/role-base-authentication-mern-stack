import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setAlert } from "../../redux/actions/alert";

// style import
import "./navbar.css";

// images import
import Avatar from "../../assets/images/avatar.png";

// utils import
import { NavLinks } from "../../utils/links/Links.js";

const baseURL = process.env.REACT_APP_API_KEY;

const Navbar = ({ containMenuItems, adjustPadding }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  let innerWidth = window.innerWidth;
  const location = useLocation();

  const windowResizeListener = useCallback(() => {
    if (innerWidth <= 820) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [innerWidth]);

  // call the function once the page has loaded to check on the current screen size
  useEffect(() => {
    windowResizeListener();
  }, [windowResizeListener]);

  // resize listener, controlling mobile responsiveness for the navbar
  window.addEventListener("resize", () => {
    innerWidth = window.innerWidth;
    if (innerWidth <= 820) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  // control visibility of the mobile menu
  const toggleShowMobile = (e) => {
    e.preventDefault();
    setShowMobile(!showMobile);
  };

  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    if(token !== null && token !== "") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  // logout
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(`${baseURL}/logout`)
      .then((response) => {
        window.location.reload();
        dispatch(setAlert(response.data.message, "success"));
      })
      .catch((error) => {
        console.log(error?.error);
      });
  };

  return (
    <nav
      role="navigation"
      className="flex a-j-space-between navbar"
      style={{
        padding: adjustPadding ? "2rem 1.6rem" : "2rem 6vw",
      }}
    >
      <div className="logo flex a-j-center">
        <Link to="/">
          <h2>User Management</h2>
        </Link>
      </div>

      <ul
        className={`${
          isMobile
            ? `mobile__menu ${showMobile ? "show" : null} absolute`
            : "menu flex"
        } a-j-center`}
      >
        {NavLinks && !isAuthenticated &&
          NavLinks.length > 0 &&
          NavLinks.map((link, index) => {
            return (
              <li key={index + link.name} className="menu__list relative">
                <Link className="menu__link" to={link.path}>
                  {link.name}
                  {isMobile && link.links && link.links.length > 0 && (
                    <i aria-hidden="true" className="fas fa-chevron-down"></i>
                  )}
                </Link>
                {!isMobile && link.links && link.links.length > 0 && (
                  <i aria-hidden="true" className="fas fa-chevron-down"></i>
                )}
                {link.links && link.links.length > 0 && (
                  <ul className="dropdown absolute">
                    {link.links.map((inner, index) => {
                      return (
                        <li
                          key={inner.name + index}
                          className="menu__list relative"
                        >
                          <Link className="menu__link" to={inner.path}>
                            {inner.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        {!containMenuItems && isAuthenticated && (
          <div className="profile__center relative">
            <div className="avatar flex a-j-center">
              <img src={Avatar} alt="user" />
            </div>
            <div className="profile__control absolute">
              <div>
                <Link to="/dashboard">
                  <i aria-hidden="true" className="fas fa-home"></i> Dashboard
                </Link>
              </div>
              <button onClick={(e) => handleLogout(e)}>
                <i aria-hidden="true" className="fas fa-sign-out-alt"></i>{" "}
                Logout
              </button>
            </div>
          </div>
        )}
      </ul>
      {isMobile && (
        <div className="toggler">
          <button
            onClick={(e) => toggleShowMobile(e)}
            className={`flex a-j-center ${showMobile ? "beautify" : null}`}
          >
            <i className="fas fa-bars" aria-hidden="true"></i>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
