import React, { Component } from "react";
import AllDivisionView from "./AllDivisionView";
import { connect } from "react-redux";
import { getLeaderboard } from "../LeaderboardActions";

class AllDivisionLeaderboard extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { getLeaderboard, session, users } = this.props;
    if (prevProps.users !== this.props.users) {
      const leaderboard = getLeaderboard(users, session);
      leaderboard.getLeaderboard("overall");
    }
  }

  render() {
    const { overall, session, overallLeaderboard, closeModal } = this.props;

    return (
      <div
        className={
          overallLeaderboard ? "popup popup-active leaderboard-popup" : "popup"
        }
      >
        {/** LEADERBOARD HEADER **/}
        <div className="leaderboard-popup__header">
          <h3 className="header-3">{session} - Overall</h3>
          <span>
            <i
              onClick={closeModal}
              className="fas fa-times leaderboard-popup__icon"
            ></i>
          </span>
        </div>

        {/** LEADERBOARD CONTENT **/}
        <div className="leaderboard-popup__content">
          {overall.length > 0 ? (
            <AllDivisionView users={overall} session={session} />
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

const mapState = state => {
  return {
    users: state.firestore.ordered.users,
    overall: state.leaderboard.overall
  };
};

export default connect(
  mapState,
  actions
)(AllDivisionLeaderboard);
