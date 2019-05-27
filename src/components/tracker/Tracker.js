/*
  Change view for each season
  * change firestore connect collection season on Tracker
  * change season on getRoutesForTracker, from TrackerActions
  * change seasonTotalValue from state to the corresponding season On Leaderboard.js
*/
import React, { Component } from "react";
import Routes from "../routes/Routes";
import AdminAddRoute from "./adminadd/AdminAddRoute";
import Leaderboard from "../leaderboard/Leaderboard";
import { deleteRoute } from "../routes/RoutesAction";
import { updateDivision } from "../../auth/AuthActions";
import { connect } from "react-redux";
import { compose } from "redux";
import { getRoutesForTracker } from "./TrackerActions";
import { firestoreConnect } from "react-redux-firebase";

class Tracker extends Component {
  state = {
    showAddRoutes: false,
    moreRoutes: false,
    loadingInitial: true,
    loadedRoutes: [],
    age: ""
  };

  async componentDidMount() {
    const { getRoutesForTracker } = this.props;

    let next = await getRoutesForTracker();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreRoutes: true,
        loadingInitial: false
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.season !== nextProps.season) {
      this.setState({
        loadedRoutes: [...this.state.loadedRoutes, ...nextProps.season]
      });
    }

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

  getNextRoutes = async () => {
    const { season, getRoutesForTracker } = this.props;
    let lastRoute = season && season[season.length - 1];

    let next = await getRoutesForTracker(lastRoute);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreRoutes: false
      });
    }
  };

  hideRoute = () => {
    this.setState({
      showAddRoutes: false
    });
  };

  render() {
    const { profile, auth, deleteRoute } = this.props,
      { showAddRoutes, loadedRoutes, moreRoutes } = this.state;

    let AddRoutes;
    if (profile && profile.admin === true) {
      AddRoutes = (
        <div className="mb-4">
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

    if (loadedRoutes) {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-5 d-md-none mb-3">
              <Leaderboard />
            </div>
            <div className="col-md-7">
              {AddRoutes}
              <Routes
                getNextRoutes={this.getNextRoutes}
                moreRoutes={moreRoutes}
                routes={loadedRoutes}
                auth={auth}
                deleteRoute={deleteRoute}
                profile={profile}
              />
            </div>
            <div className="col-md-5 d-none d-md-block">
              <Leaderboard />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

const mapState = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  season: state.season
});

const actions = {
  deleteRoute,
  getRoutesForTracker,
  updateDivision
};

export default compose(
  firestoreConnect([{ collection: "season1" }]),
  connect(
    mapState,
    actions
  )
)(Tracker);
