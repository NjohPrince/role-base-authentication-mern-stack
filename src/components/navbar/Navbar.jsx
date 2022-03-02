import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// style import
import "./navbar.css";

// images import
import Avatar from "../../assets/images/avatar.png";

// utils import
import { NavLinks } from "../../utils/links/Links.js";

const Navbar = ({ containMenuItems, adjustPadding }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  let innerWidth = window.innerWidth;

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

  // logout
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout Pressed!");
  };

  return (
    <nav
      role="navigation"
      className="flex a-j-space-between navbar"
      style={{
        padding: adjustPadding ? "2rem 1.6rem" : "2rem 6vw"
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
        {NavLinks && containMenuItems &&
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
        {!containMenuItems && (
          <div className="profile__center relative">
            <div className="avatar flex a-j-center">
              <img src={Avatar} alt="user" />
            </div>
            <div className="profile__control absolute">
              <div>
                <Link to="/">
                  <i aria-hidden="true" className="fas fa-home"></i> Home Page
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
