import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { routeDetailedQuery } from "./routeQuery";
import RouteField from "./RouteField";

class EditRoute extends Component {
  render() {
    const { initialValues, user, currentRoute } = this.props;
    if (initialValues) {
      return (
        <div className="container mt-5 mb-5">
          <RouteField
            user={user}
            initialValues={initialValues[0]}
            currentRoute={currentRoute}
          />
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapState = (state, ownProps) => {
  let currentSeason, currentRoute, initialValues;

  if (state.firebase.auth.uid && state.firestore.ordered) {
    const id = ownProps.match.params.id,
      urlTarget = id.split("_"),
      season = urlTarget[0],
      routeName = urlTarget[urlTarget.length - 1];
    initialValues = state.firestore.ordered[season];
    currentSeason = season;
    currentRoute = routeName;
  }
  return {
    season: currentSeason,
    route: currentRoute,
    initialValues,
    user: state.firebase.profile
  };
};

export default compose(
  connect(mapState),
  firestoreConnect((season, route) => routeDetailedQuery(season, route))
)(EditRoute);
