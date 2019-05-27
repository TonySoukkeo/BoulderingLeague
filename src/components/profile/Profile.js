import React, { Component } from "react";
import EditProfile from "./editprofile/EditProfile";
import EditProfileDisplay from "./editprofiledisplay/EditProfileDisplay";
import UserRouteGrade from "./user/userprofile/UserRouteGrade";
import { connect } from "react-redux";
import Spinner from "../../common/helpers/Spinner";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  goBack = () => {
    const { history } = this.props;

    // Go back to previous page
    history.goBack();
  };

  render() {
    const { user } = this.props;
    if (user) {
      return (
        <div className="container mt-5">
          <button onClick={this.goBack} className="btn btn-lg mb-3 back-btn">
            <i className="fas fa-arrow-circle-left" /> Back
          </button>
          <div className="row">
            <div id="left-profile-col" className="col-md-5 mb-5">
              <EditProfileDisplay user={user} />
            </div>

            <div className="col-md-7">
              <UserRouteGrade user={user} />
              <EditProfile />
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapState = state => ({
  user: state.firebase.profile
});

export default withRouter(connect(mapState)(Profile));
