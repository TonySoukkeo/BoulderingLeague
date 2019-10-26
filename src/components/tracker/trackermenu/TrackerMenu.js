import React, { Component } from "react";
import { getRank } from "../userrank/UserRankActions";
import { createUserProfile } from "../../profile/ProfileActions";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class TrackerMenu extends Component {
  state = {
    rank: "-"
  };

  async componentDidUpdate(prevProps) {
    const {
      getRank,
      auth,
      currentSession,
      createUserProfile,
      users
    } = this.props;

    const windowWidth = window.innerWidth;

    if (this.props.users !== prevProps.users && windowWidth < 700) {
      const rank = await getRank(currentSession, auth);
      const profile = createUserProfile(auth.uid, users);

      profile.getUserLevel("mainLevel");

      this.setState({ rank });
    }
  }

  render() {
    const {
      toggleTracker,
      toggleLeaderboard,
      leaderboardView,
      trackerView
    } = this.props;

    const { rank } = this.state;

    return (
      <div className="tracker-menu">
        <div className="tracker-menu__tracker">
          <i
            onClick={toggleTracker}
            className={
              trackerView
                ? "fas fa-align-left tracker-menu--icon tracker-menu--icon-active"
                : "fas fa-align-left tracker-menu--icon"
            }
          ></i>
        </div>
        <div className="tracker-menu__rank">
          <h3 className="header-3 tracker-menu-header">Rank</h3>
          <span className="tracker-menu-position">{rank}</span>
        </div>
        <div className="tracker-menu__leaderboard">
          <i
            onClick={toggleLeaderboard}
            className={
              leaderboardView
                ? "fas fa-award tracker-menu--icon tracker-menu--icon-active"
                : "fas fa-award tracker-menu--icon"
            }
          ></i>
        </div>
      </div>
    );
  }
}

const actions = {
  getRank,
  createUserProfile
};

const mapState = state => ({
  level: state.profile.mainLevel,
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  currentSession: state.currentSession.currentSession
});

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect([{ collection: "users" }])
)(TrackerMenu);
