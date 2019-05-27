import React, { Component } from "react";
import AdultDivision from "./adultdivision/AdultDivision";
import YouthDivision from "./youthdivision/YouthDivision";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getAdultDivision } from "./adultdivision/AdultActions";

class Leaderboard extends Component {
  state = {
    seasonTotalValue: "season1Total"
  };

  getYouth = users => {
    const { seasonTotalValue } = this.state;
    const user = users.filter(x => x.division === "youth");
    const hasSeason = user.filter(x => x.season);
    let youth, seasonTotal;

    const current = user.filter(x => x.season);

    if (current.length !== 0 && current) {
      // filter out users with season totals
      youth = hasSeason.filter(x => x.season[seasonTotalValue]);
      // Sort user total from high to low
      seasonTotal = youth.sort(
        (a, b) => b.season[seasonTotalValue] - a.season[seasonTotalValue]
      );

      if (seasonTotal.length > 3) {
        let topThree;
        topThree = seasonTotal.slice(0, 3);

        return topThree;
      } else {
        return seasonTotal;
      }
    }
  };

  getAdult = users => {
    const { seasonTotalValue } = this.state;
    const user = users.filter(x => x.division === "adult");
    const hasSeason = user.filter(x => x.season);
    let adult, seasonTotal;

    const current = user.filter(x => x.season);

    if (current.length !== 0) {
      // filter out users with season totals
      adult = hasSeason.filter(x => x.season[seasonTotalValue]);
      // Sort user total from high to low
      seasonTotal = adult.sort(
        (a, b) => b.season[seasonTotalValue] - a.season[seasonTotalValue]
      );

      if (seasonTotal.length > 3) {
        let topThree;
        topThree = seasonTotal.slice(0, 3);

        return topThree;
      } else {
        return seasonTotal;
      }
    }
  };

  render() {
    const { users } = this.props,
      { seasonTotalValue } = this.state;

    if (users) {
      return (
        <div className="sticky-top">
          <AdultDivision
            users={this.getAdult(users)}
            seasonTotalValue={seasonTotalValue}
          />
          <YouthDivision
            users={this.getYouth(users)}
            seasonTotalValue={seasonTotalValue}
          />
        </div>
      );
    } else {
      return <div>Loading</div>;
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
