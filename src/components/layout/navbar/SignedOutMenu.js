import React from "react";
import { Link } from "react-router-dom";

const SignedOutMenu = () => {
  return (
    <React.Fragment>
      <div className="d-none d-md-block ml-auto">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
      <div className="d-block d-md-none ml-auto">
        <ul className="navbar-nav ml-auto">
          <li
            data-toggle="collapse"
            data-target="#navbarNav"
            className="nav-item"
          >
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li
            data-toggle="collapse"
            data-target="#navbarNav"
            className="nav-item"
          >
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SignedOutMenu;
