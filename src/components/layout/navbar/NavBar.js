import React, { Component } from "react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";
import { toastr } from "react-redux-toastr";
import { withRouter } from "react-router-dom";
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
      <nav className="navbar">
        {!authenticated ? (
          <SignedOutMenu />
        ) : (
          <SignedInMenu profile={profile} signOut={this.signOut} />
        )}
      </nav>
    );
  }
}

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default withRouter(withFirebase(connect(mapState)(NavBar)));
