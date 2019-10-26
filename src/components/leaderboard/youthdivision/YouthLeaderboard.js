import React, { Component } from "react";
import { connect } from "react-redux";
import YouthView from "./YouthView";
import { getLeaderboard } from "../LeaderboardActions";

class YouthLeaderboard extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { users, session, getLeaderboard } = this.props;

    if (prevProps.users !== this.props.users) {
      const leaderboard = getLeaderboard(users, session);
      leaderboard.getLeaderboard("youth");
    }
  }

  render() {
    const { session, youthLeaderboard, closeModal, youth } = this.props;

    return (
      <div
        className={
          youthLeaderboard ? "popup popup-active leaderboard-popup" : "popup"
        }
      >
        {/** LEADERBOARD HEADER **/}
        <div className="leaderboard-popup__header">
          <h3 className="header-3">{session} - Youth Division</h3>
          <span>
            <i
              onClick={closeModal}
              className="fas fa-times leaderboard-popup__icon"
            ></i>
          </span>
        </div>

        {/** LEADERBOARD CONTENT **/}
        <div className="leaderboard-popup__content">
          {youth.length > 0 ? (
            <YouthView users={youth} session={session} />
          ) : (
            <div className="leaderboard__empty">
              <p>Be the first on the board!</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const actions = {
  getLeaderboard
};

const mapState = state => ({
  users: state.firestore.ordered.users,
  youth: state.leaderboard.youth
});

export default connect(
  mapState,
  actions
)(YouthLeaderboard);
