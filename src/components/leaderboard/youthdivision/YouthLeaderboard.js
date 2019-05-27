import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import YouthView from "./YouthView";

class YouthLeaderboard extends Component {
  state = {
    youth: [],
    season: ""
  };

  componentDidMount() {
    const seasonTotalValue = this.props.match.params.id;

    this.setState({
      season: seasonTotalValue
    });
  }

  getYouthDivision = users => {
    const user = users.filter(x => x.division === "youth"),
      { season } = this.state;

    const hasSeason = user.filter(x => x.season);

    // filter out users with season totals
    const youth = hasSeason.filter(x => x.season[season]);

    // Sort user total from high to low
    const seasonTotal = youth.sort(
      (a, b) => b.season[season] - a.season[season]
    );
    return seasonTotal;
  };

  goBack = () => {
    const { history } = this.props;

    // Go back to previous page
    history.goBack();
  };

  render() {
    const { season } = this.state,
      { users } = this.props;

    if (users) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto mt-1">
              <button
                style={{ marginTop: "30px" }}
                onClick={this.goBack}
                className="btn btn-back btn-lg"
              >
                <i className="fas fa-arrow-circle-left" /> Back
              </button>
              <div className="card">
                <div
                  style={{ marginBottom: ".7px" }}
                  className="card-header text-center"
                >
                  <h3>{season}</h3>
                </div>

                <YouthView
                  users={this.getYouthDivision(users)}
                  season={season}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapState = state => ({
  users: state.firestore.ordered.users
});

export default withRouter(
  compose(
    connect(mapState),
    firestoreConnect([{ collection: "users" }])
  )(YouthLeaderboard)
);
