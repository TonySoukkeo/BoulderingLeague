import React, { Component } from "react";
import EditProfile from "./editprofile/EditProfile";
import ProfileAchievements from "./profileachievements/ProfileAchievements";
import { createUserProfile } from "./ProfileActions";
import SessionView from "./sessionview/SessionView";
import ProfileHeader from "./profileheader/ProfileHeader";
import ProfileDetail from "./profiledetail/ProfileDetail";
import format from "date-fns/format";
import { modalToggle } from "../modals/modalsaction/ModalsAction";
import {
  SESSION_OPEN,
  CLOSE_MODAL
} from "../modals/modalsaction/ModalConstants";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Profile extends Component {
  state = {
    session: null
  };

  componentDidMount() {
    const { auth, createUserProfile, users } = this.props;

    if (users) {
      const profile = createUserProfile(auth.uid, users);

      profile.getGrade();
      profile.getName();
      profile.getSession();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { users, auth, createUserProfile } = this.props;

    if (this.props.users !== prevProps.users) {
      const profile = createUserProfile(auth.uid, users);

      profile.getGrade();
      profile.getName();
      profile.getSession();
    }
  }

  profileImageChange = () => {
    this.setState({ openModal: true });
  };

  openSession = session => {
    const { modalToggle } = this.props;

    // Sort array by route grade
    const sortSession = session.sort((a, b) => {
      if (a.grade > b.grade) return 1;
      else if (b.grade > a.grade) return -1;
      else return 0;
    });

    this.setState({
      session: sortSession
    });

    modalToggle(SESSION_OPEN);
  };

  closeSession = () => {
    const { modalToggle } = this.props;
    this.setState({ session: null });

    modalToggle(CLOSE_MODAL);
  };

  render() {
    const {
      user,
      profileGrade,
      completedSession,
      auth,
      sessionModal
    } = this.props;

    const { session } = this.state;

    return (
      <div className="profile">
        {/** PROFILE HEADER **/}
        <div className="profile__header">
          <ProfileHeader user={user} />
        </div>

        <div className="profile__content">
          {/** PROFILE EDIT **/}
          <div className="profile__edit">
            <EditProfile />
          </div>

          {/** PROFILE DETAIL **/}
          {user.session ? (
            <div className="profile__detail">
              <ProfileDetail currentUser={user} />
            </div>
          ) : null}

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
          <SessionView
            completedSession={completedSession}
            openSession={this.openSession}
          />

          {/** ACHIEVEMENTS **/}
          <ProfileAchievements uid={auth.uid} />
        </div>

        {/** SESSION VIEW MODAL **/}
        <div
          className={
            sessionModal ? "popup popup-active session-modal" : "popup"
          }
        >
          <span>
            <i
              onClick={this.closeSession}
              className="fas fa-times session-modal--icon"
            ></i>
          </span>
          <div className="session-modal__content">
            {session && session.length > 0 ? (
              session.map(value => (
                <div key={value.uid} className="session-modal__content-box">
                  <div className="session-modal__name">{value.routeName}</div>

                  <div className="session-modal__grade">
                    {value.grade === "special" ? "SP" : value.grade}
                  </div>

                  <div className="session-modal__completed">
                    Completed on: {format(value.completedOn, "MMMM D YYYY")}
                  </div>
                </div>
              ))
            ) : (
              <div className="session-modal__na">
                <i className="far fa-frown-open"></i>
                <h2>No completed routes</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.firebase.profile,
  users: state.firestore.ordered.users,
  profileGrade: state.profile.grade,
  profileName: state.profile.name,
  auth: state.firebase.auth,
  completedSession: state.profile.session,
  sessionModal: state.modal.sessionModal
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
)(Profile);
