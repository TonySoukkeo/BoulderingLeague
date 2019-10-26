import React, { Component } from "react";
import { connect } from "react-redux";
import { createUserProfile } from "../ProfileActions";
import UserProfileLevel from "../profilelevel/UserProfileLevel";
import UserProfileSummary from "./UserProfileSummary";

class UserProfileDetail extends Component {
  componentDidMount() {
    const { createUserProfile, currentUser } = this.props;

    const id = currentUser.id,
      profile = createUserProfile(id);

    profile.getUserLevel("userLevel", currentUser);
  }

  render() {
    const { currentUser, userLevel } = this.props;

    return (
      <div className="profile__detail">
        <div className="profile__detail-name mb-small">
          <h2>
            {currentUser.firstName} {currentUser.lastName}
          </h2>
        </div>

        {currentUser.about && currentUser.about !== "" ? (
          <div className="profile__detail-about mb-small">
            <div className="profile__detail-about--line"></div>
            {currentUser.about}
          </div>
        ) : null}

        <div className="user-profile-summary">
          <div className="profile__detail-level mb-small">
            <UserProfileLevel currentUser={currentUser} level={userLevel} />
          </div>

          {currentUser.session ? (
            <UserProfileSummary currentUser={currentUser} />
          ) : null}
        </div>
      </div>
    );
  }
}

const actions = {
  createUserProfile
};

const mapStateToProps = state => ({
  userLevel: state.profile.userLevel
});

export default connect(
  mapStateToProps,
  actions
)(UserProfileDetail);
