import React, { Component } from "react";
import { connect } from "react-redux";
import AdultView from "./AdultView";
import { getLeaderboard } from "../LeaderboardActions";

class AdultLeaderboard extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { users, session, getLeaderboard } = this.props;

    if (prevProps.users !== this.props.users) {
      const leaderboard = getLeaderboard(users, session);
      leaderboard.getLeaderboard("adult");
    }
  }

  render() {
    const { session, adultLeaderboard, closeModal, adult } = this.props;
    return (
      <div
        className={
          adultLeaderboard ? "popup popup-active leaderboard-popup" : "popup"
        }
      >
        {/** LEADERBOARD HEADER **/}
        <div className="leaderboard-popup__header">
          <h3 className="header-3">{session} - Adult Division</h3>
          <span>
            <i
              onClick={closeModal}
              className="fas fa-times leaderboard-popup__icon"
            ></i>
          </span>
        </div>

        {/** LEADERBOARD CONTENT **/}
        <div className="leaderboard-popup__content">
          {adult.length > 0 ? (
            <AdultView users={adult} session={session} />
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
  adult: state.leaderboard.adult
});

export default connect(
  mapState,
  actions
)(AdultLeaderboard);
