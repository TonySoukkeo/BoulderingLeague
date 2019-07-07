import React from "react";
import { Link } from "react-router-dom";

const SignedInMenu = ({ signOut, profile }) => {
  return (
    <React.Fragment>
      <div className="d-none d-md-block ml-auto">
        <ul className="navbar-nav ml-auto ">
          <li className="nav-item">
            <Link to={"/tracker"} className="nav-link">
              Tracker
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Welcome, {profile.firstName}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/rules" className="nav-link">
              Rules
            </Link>
          </li>
          {profile.permission === "admin" && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
          )}

          <li className="nav-item">
            <a onClick={signOut} href="#!" className="nav-link">
              <i className="fas fa-power-off" /> Sign Out
            </a>
          </li>
        </ul>
      </div>

      <div className="d-block d-md-none">
        <ul className="navbar-nav ml-auto ">
          <li
            data-toggle="collapse"
            data-target="#navbarNav"
            className="nav-item"
          >
            <Link to={"/tracker"} className="nav-link">
              Tracker
            </Link>
          </li>

          <li
            data-toggle="collapse"
            data-target="#navbarNav"
            className="nav-item"
          >
            <Link to="/profile" className="nav-link">
              Welcome, {profile.firstName}
            </Link>
          </li>

          <li
            data-toggle="collapse"
            data-target="#navbarNav"
            className="nav-item"
            className="nav-item"
          >
            <Link to="/rules" className="nav-link">
              Rules
            </Link>
          </li>

          {profile.permission === "admin" && (
            <li
              data-toggle="collapse"
              data-target="#navbarNav"
              className="nav-item"
            >
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
          )}

          <li
            data-toggle="collapse"
            data-target="#navbarNav"
            className="nav-item"
          >
            <a onClick={signOut} href="#!" className="nav-link">
              <i className="fas fa-power-off" /> Sign Out
            </a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SignedInMenu;
