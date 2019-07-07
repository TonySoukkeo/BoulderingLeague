/*
  Change view for each session
  * change firestore connect collection session on Tracker
  * change session on getRoutesForTracker, from TrackerActions || Change session on routes, in mapStateToProps
  * change sessionTotalValue from state to the corresponding session On Leaderboard.js
  * Change currentSession on state for Tracker, for Active session toggle for live view
  * For Each new session, go into Admin Add routes, and change the option from previous session to the next session
*/
import React, { Component } from "react";
import AlertDisplay from "./alertdisplay/AlertDisplay";
import Routes from "../routes/Routes";
import AdminAddRoute from "./adminadd/AdminAddRoute";
import Leaderboard from "../leaderboard/Leaderboard";
import { deleteRoute } from "../routes/RoutesAction";
import { updateDivision } from "../../auth/AuthActions";
import SessionSelector from "./activesession/SessionSelector";
import RoutesIntermission from "../../common/helpers/RoutesIntermission";
import { connect } from "react-redux";
import { compose } from "redux";
import UserProfileLevel from "../profile/profilelevel/UserProfileLevel";
import { getRoutesForTracker } from "./TrackerActions";
import { firestoreConnect } from "react-redux-firebase";

class Tracker extends Component {
  state = {
    showAddRoutes: false,
    moreRoutes: false,
    age: "",
    currentSession: "session1"
  };

  async componentWillReceiveProps(nextProps) {
    if (this.props.profile.dateOfBirth) {
      // Calculate users age
      let today = new Date(),
        birthDate = nextProps.profile.dateOfBirth,
        age = today.getFullYear() - birthDate.getFullYear(),
        m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      const { profile, updateDivision } = this.props;

      if (age >= 18) {
        await updateDivision(profile);
      }
    }
  }

  hideRoute = () => {
    this.setState({
      showAddRoutes: false
    });
  };

  render() {
    const { profile, auth, deleteRoute, routes } = this.props,
      { showAddRoutes, currentSession } = this.state;

    let AddRoutes, getRoutes;

    if (routes) {
      // Sort routes by routeGrade
      getRoutes = routes.sort((a, b) => {
        if (a.routeGrade > b.routeGrade) return 1;
        else if (b.routeGrade > a.routeGrade) return -1;
        else return 0;
      });
    }

    if (
      (profile && profile.permission === "admin") ||
      profile.permission === "route setter"
    ) {
      AddRoutes = (
        <div className="mb-4">
          <SessionSelector currentSession={currentSession} />
          <button
            onClick={() =>
              this.setState({
                showAddRoutes: !this.state.showAddRoutes
              })
            }
            className={showAddRoutes ? "btn btn-danger" : "btn btn-primary"}
          >
            {showAddRoutes ? "Close" : "Add Route"}
          </button>
          {showAddRoutes && (
            <AdminAddRoute
              hideRoute={this.hideRoute}
              profile={profile}
              auth={auth}
            />
          )}
          <hr />
        </div>
      );
    }

    return (
      <div className="container mt-5">
        <AlertDisplay profile={profile} />
        <div className="row">
          <div className="col-md-5 d-md-none mb-3">
            <UserProfileLevel currentUser={profile} />
            <Leaderboard />
          </div>
          <div className="col-md-7 d-md-none mb-3">
            {AddRoutes}
            {routes ? (
              <Routes
                currentSession={currentSession}
                routes={getRoutes}
                auth={auth}
                deleteRoute={deleteRoute}
                profile={profile}
              />
            ) : (
              <div>
                {profile.permission === "admin" ||
                profile.permission === "route setter" ? (
                  <h2 className="text-center">Start adding in some routes</h2>
                ) : (
                  <h2 className="text-center">New Routes coming soon!</h2>
                )}
                <RoutesIntermission />
              </div>
            )}
          </div>
          <div className="col-md-7 d-none d-md-block mb-3">
            <UserProfileLevel currentUser={profile} />
            {AddRoutes}
            {routes ? (
              <Routes
                currentSession={currentSession}
                routes={getRoutes}
                auth={auth}
                deleteRoute={deleteRoute}
                profile={profile}
              />
            ) : (
              <div>
                {profile.permission === "admin" ||
                profile.permission === "route setter" ? (
                  <h2 className="text-center">Start adding in some routes</h2>
                ) : (
                  <h2 className="text-center">New Routes coming soon!</h2>
                )}
                <RoutesIntermission />
              </div>
            )}
          </div>
          <div className="col-md-5 d-none d-md-block">
            <Leaderboard />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  session: state.session,
  routes: state.firestore.ordered.session1 // Change session for routes display view
});

const actions = {
  deleteRoute,
  getRoutesForTracker,
  updateDivision
};

export default compose(
  firestoreConnect([{ collection: "session1" }]), // change session for routes display view
  connect(
    mapState,
    actions
  )
)(Tracker);
