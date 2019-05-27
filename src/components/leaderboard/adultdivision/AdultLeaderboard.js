import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import AdultView from "./AdultView";

class AdultLeaderboard extends Component {
  state = {
    adult: [],
    season: ""
  };

  componentDidMount() {
    const seasonTotalValue = this.props.match.params.id;
    this.setState({
      season: seasonTotalValue
    });
  }

  getAdultDivision = users => {
    const user = users.filter(x => x.division === "adult"),
      { season } = this.state;

    const hasSeason = user.filter(x => x.season);
    // filter out users with season totals
    const adult = hasSeason.filter(x => x.season[season]);

    // Sort user total from high to low
    const seasonTotal = adult.sort(
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
                className="btn back-btn btn-lg"
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

                <AdultView
                  users={this.getAdultDivision(users)}
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
  )(AdultLeaderboard)
);
