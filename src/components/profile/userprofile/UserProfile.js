import React, { Component } from "react";
import UserProfileDetail from "./UserProfileDetail";
import UserProfileHeader from "./UserProfileHeader";
import ProfileAchievements from "../profileachievements/ProfileAchievements";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { createUserProfile } from "../ProfileActions";
import SessionView from "../sessionview/SessionView";
import { modalToggle } from "../../modals/modalsaction/ModalsAction";
import { CLOSE_MODAL } from "../../modals/modalsaction/ModalConstants";

class UserProfile extends Component {
  state = {
    uid: ""
  };

  componentDidMount() {
    const { modalToggle, users, createUserProfile } = this.props;
    const uid = this.props.match.params.id;

    if (users) {
      const profile = createUserProfile(uid, users);

      profile.getGrade();
      profile.getSession();
    }

    // CLOSE MODALS IF ANY
    modalToggle(CLOSE_MODAL);
    this.setState({ uid });
  }

  componentDidUpdate(prevProps, prevState) {
    const { createUserProfile, users } = this.props;

    if (this.props.users !== prevProps.users) {
      const uid = this.props.match.params.id;
      const profile = createUserProfile(uid, users);

      profile.getGrade();
      profile.getSession();
    }
  }

  render() {
    const { users, profileGrade, completedSession } = this.props;

    const { uid } = this.state;

    let currentUser;

    if (users) {
      currentUser = users.filter(user => user.id === uid)[0];
    }

    return (
      <React.Fragment>
        {currentUser ? (
          <div className="profile">
            {/** PROFILE HEADER **/}
            <div className="profile__header">
              <UserProfileHeader user={currentUser} />
            </div>

            {/** PROFILE DETAIL **/}
            <UserProfileDetail currentUser={currentUser} />

            {/** GRADE TOTAL **/}
            <div className="profile__grade">
              {Object.entries(profileGrade).map(grade => (
                <div key={grade[0]} className="profile__grade-box">
                  <div className="profile__grade-box--title">{grade[0]}</div>
                  <div className="profile__grade-box--value">{grade[1]}</div>
                </div>
              ))}
            </div>

            {/** SESSSION VIEW **/}
            <SessionView completedSession={completedSession} />

            {/** ACHIEVEMENTS **/}
            <ProfileAchievements uid={uid} />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  users: state.firestore.ordered.users,
  profileGrade: state.profile.grade,
  profileName: state.profile.name,
  completedSession: state.profile.session
});

const actions = {
  createUserProfile,
  modalToggle
};

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect([{ collection: "users" }])
)(UserProfile);
