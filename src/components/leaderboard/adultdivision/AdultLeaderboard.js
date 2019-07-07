import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import AdultView from "./AdultView";
import Spinner2 from "../../../common/helpers/Spinner2";

class AdultLeaderboard extends Component {
  state = {
    adult: [],
    session: ""
  };

  componentDidMount() {
    const sessionTotalValue = this.props.match.params.id;
    this.setState({
      session: sessionTotalValue
    });
  }

  getAdultDivision = users => {
    const user = users.filter(x => x.division === "adult"),
      { session } = this.state;

    const hasSession = user.filter(x => x.session);
    // filter out users with session totals
    const adult = hasSession.filter(x => x.session[session]);

    // Sort user total from high to low
    const sessionTotal = adult.sort(
      (a, b) => b.session[session] - a.session[session]
    );
    return sessionTotal;
  };

  goBack = () => {
    const { history } = this.props;

    // Go back to previous page
    history.goBack();
  };

  render() {
    const { session } = this.state,
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
                  <h3>{session}</h3>
                </div>

                <AdultView
                  users={this.getAdultDivision(users)}
                  session={session}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner2 />;
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
