import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import Spinner2 from "../../../common/helpers/Spinner2";
import YouthView from "./YouthView";

class YouthLeaderboard extends Component {
  state = {
    youth: [],
    session: ""
  };

  componentDidMount() {
    const sessionTotalValue = this.props.match.params.id;

    this.setState({
      session: sessionTotalValue
    });
  }

  getYouthDivision = users => {
    const user = users.filter(x => x.division === "youth"),
      { session } = this.state;

    const hasSession = user.filter(x => x.session);

    // filter out users with session totals
    const youth = hasSession.filter(x => x.session[session]);

    // Sort user total from high to low
    const sessionTotal = youth.sort(
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
                className="btn btn-back btn-lg"
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

                <YouthView
                  users={this.getYouthDivision(users)}
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
  )(YouthLeaderboard)
);
