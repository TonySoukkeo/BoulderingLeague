import React, { Component } from "react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";
import { toastr } from "react-redux-toastr";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";

class NavBar extends Component {
  signOut = () => {
    const { firebase, history } = this.props;

    try {
      firebase.logout();
      history.push("/");
      toastr.success("Success!", "You have logged out");
    } catch (error) {
      toastr.error("Oops", "Could not log out");
    }
  };

  render() {
    const { auth, profile } = this.props,
      authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <nav
        style={{ zIndex: "99999" }}
        className="navbar navbar-expand-lg sticky-top"
      >
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <img
              style={{
                height: "50px"
              }}
              src="/assets/logo.png"
              alt="logo"
            />
          </Link>
          <button
            className="navbar-toggler navbar-dark"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon " />
          </button>

          <div id="navbarNav" className="collapse navbar-collapse">
            {authenticated ? (
              <SignedInMenu profile={profile} signOut={this.signOut} />
            ) : (
              <SignedOutMenu />
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default withRouter(withFirebase(connect(mapState)(NavBar)));
