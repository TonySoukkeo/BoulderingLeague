import React, { Component } from "react";
import AllDivision from "./alldivision/AllDivision";
import AdultDivision from "./adultdivision/AdultDivision";
import YouthDivision from "./youthdivision/YouthDivision";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getAdultDivision } from "./adultdivision/AdultActions";
import Spinner2 from "../../common/helpers/Spinner2";

class Leaderboard extends Component {
  state = {
    sessionTotalValue: "session1Total"
  };

  getYouth = users => {
    const { sessionTotalValue } = this.state;
    const user = users.filter(x => x.division === "youth");
    const hasSession = user.filter(x => x.session);
    let youth, sessionTotal;

    const current = user.filter(x => x.session);

    if (current.length !== 0 && current) {
      // filter out users with session totals
      youth = hasSession.filter(x => x.session[sessionTotalValue]);
      // Sort user total from high to low
      sessionTotal = youth.sort(
        (a, b) => b.session[sessionTotalValue] - a.session[sessionTotalValue]
      );

      if (sessionTotal.length > 3) {
        let topThree;
        topThree = sessionTotal.slice(0, 3);

        return topThree;
      } else {
        return sessionTotal;
      }
    }
  };

  getAdult = users => {
    const { sessionTotalValue } = this.state;
    const user = users.filter(x => x.division === "adult");
    const hasSession = user.filter(x => x.session);
    let adult, sessionTotal;

    const current = user.filter(x => x.session);

    if (current.length !== 0) {
      // filter out users with session totals
      adult = hasSession.filter(x => x.session[sessionTotalValue]);
      // Sort user total from high to low
      sessionTotal = adult.sort(
        (a, b) => b.session[sessionTotalValue] - a.session[sessionTotalValue]
      );

      if (sessionTotal.length > 3) {
        let topThree;
        topThree = sessionTotal.slice(0, 3);

        return topThree;
      } else {
        return sessionTotal;
      }
    }
  };

  render() {
    const { users } = this.props,
      { sessionTotalValue } = this.state;

    if (users) {
      return (
        <div className="sticky-top">
          <AllDivision sessionTotalValue={sessionTotalValue} />
          <AdultDivision
            users={this.getAdult(users)}
            sessionTotalValue={sessionTotalValue}
          />
          <YouthDivision
            users={this.getYouth(users)}
            sessionTotalValue={sessionTotalValue}
          />
        </div>
      );
    } else {
      return <Spinner2 />;
    }
  }
}

const actions = {
  getAdultDivision
};

const mapState = state => ({
  users: state.firestore.ordered.users
});

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(
    mapState,
    actions
  )
)(Leaderboard);
