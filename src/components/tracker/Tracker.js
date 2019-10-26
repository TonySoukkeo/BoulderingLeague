/*
  Change view for each session
  * change firestore connect collection session on Tracker
  * change session on getRoutesForTracker, from TrackerActions |* Change session on routes, in mapStateToProps
  * change sessionTotalValue from state to the corresponding session On Leaderboard.js
  * Change currentSession on state for Tracker, for Active session toggle for live view
  * For Each new session, go into Admin Add routes, and change the option from previous session to the next session
*/

import React, { Component } from "react";
import AlertDisplay from "./alertdisplay/AlertDisplay";
import Routes from "../routes/Routes";
import AdminAddRoute from "./adminadd/AdminAddRoute";
import { deleteRoute } from "../routes/RoutesAction";
import { updateDivision } from "../../auth/AuthActions";
import SessionSelector from "./activesession/SessionSelector";
import RoutesIntermission from "../../common/helpers/RoutesIntermission";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import LeaderboardView from "./leaderboardview/LeaderboardView";
import TrackerMenu from "./trackermenu/TrackerMenu";
import {
  ADULT_LEADERBOARD_OPEN,
  YOUTH_LEADERBOARD_OPEN,
  OVERALL_LEADERBOARD_OPEN,
  ADD_ROUTES_OPEN,
  CLOSE_MODAL
} from "../modals/modalsaction/ModalConstants";
import { modalToggle } from "../modals/modalsaction/ModalsAction";
import { getCurrentSession } from "../tracker/currentsession/CurrentSessionActions";

class Tracker extends Component {
  state = {
    showAddRoutes: false,
    moreRoutes: false,
    age: "",
    trackerView: true,
    leaderboardView: false
  };

  componentDidMount() {
    const { getCurrentSession } = this.props;

    getCurrentSession("session4"); // Change for each new session
  }

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

  closeModal = () => {
    const { modalToggle } = this.props;

    modalToggle(CLOSE_MODAL);
  };

  toggleTracker = () => {
    this.setState({
      trackerView: true,
      leaderboardView: false
    });
  };

  toggleLeaderboard = () => {
    this.setState({
      trackerView: false,
      leaderboardView: true
    });
  };

  openOverallLeaderboard = () => {
    const { modalToggle } = this.props;

    modalToggle(OVERALL_LEADERBOARD_OPEN);
  };

  openAdultLeaderboard = () => {
    const { modalToggle } = this.props;

    modalToggle(ADULT_LEADERBOARD_OPEN);
  };

  openYouthLeaderboard = () => {
    const { modalToggle } = this.props;

    modalToggle(YOUTH_LEADERBOARD_OPEN);
  };

  openAddRoute = () => {
    const { modalToggle } = this.props;

    modalToggle(ADD_ROUTES_OPEN);
  };

  render() {
    const {
        profile,
        auth,
        deleteRoute,
        routes,
        overallModal,
        youthModal,
        adultModal,
        currentSession
      } = this.props,
      { showAddRoutes, trackerView, leaderboardView } = this.state;

    let addRoutes, getRoutes;

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
      addRoutes = (
        <div className="add-routes">
          <button onClick={this.openAddRoute} className={"btn add-routes--btn"}>
            Add Route
          </button>
          <SessionSelector currentSession={currentSession} />

          {/* ADD ROUTE MODAL */}
          {profile && (
            <AdminAddRoute
              closeModal={this.closeModal}
              showAddRoutes={showAddRoutes}
              hideRoute={this.hideRoute}
              profile={profile}
              auth={auth}
            />
          )}
        </div>
      );
    }

    return (
      <React.Fragment>
        {/* TRACKER MAIN MENU */}
        <TrackerMenu
          toggleTracker={this.toggleTracker}
          toggleLeaderboard={this.toggleLeaderboard}
          currentSession={currentSession}
          trackerView={trackerView}
          leaderboardView={leaderboardView}
        />

        {/* TRACKER ROUTES DISPLAY */}
        {trackerView ? (
          <div className="tracker-container">
            <div className="leaderboard-block-md">
              <LeaderboardView
                session={currentSession}
                closeModal={this.closeModal}
                overallLeaderboard={overallModal}
                adultLeaderboard={adultModal}
                youthLeaderboard={youthModal}
                openOverallLeaderboard={this.openOverallLeaderboard}
                openAdultLeaderboard={this.openAdultLeaderboard}
                openYouthLeaderboard={this.openYouthLeaderboard}
              />
            </div>

            <div className="route-container">
              {addRoutes}

              {routes ? (
                <Routes
                  addRoutes={addRoutes}
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
          </div>
        ) : null}

        {/** LEADERBOARD DISPLAY **/}
        {leaderboardView ? (
          <div className="leaderboard-block-sm">
            <LeaderboardView
              session={currentSession}
              closeModal={this.closeModal}
              overallLeaderboard={overallModal}
              adultLeaderboard={adultModal}
              youthLeaderboard={youthModal}
              openOverallLeaderboard={this.openOverallLeaderboard}
              openAdultLeaderboard={this.openAdultLeaderboard}
              openYouthLeaderboard={this.openYouthLeaderboard}
            />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  session: state.session,
  routes: state.firestore.ordered.session4, // Change session for routes display view
  overallModal: state.modal.overallLeaderboardModal,
  youthModal: state.modal.youthLeaderboardModal,
  adultModal: state.modal.adultLeaderboardModal,
  currentSession: state.currentSession.currentSession
});

const actions = {
  deleteRoute,
  updateDivision,
  modalToggle,
  getCurrentSession
};

export default compose(
  firestoreConnect([{ collection: "session4" }]), // change session for routes display view
  connect(
    mapState,
    actions
  )
)(Tracker);
