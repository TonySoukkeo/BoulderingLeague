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
        <React.Fragment>
          <div className="edit-route">
            <RouteField
              user={user}
              initialValues={initialValues[0]}
              currentRoute={currentRoute}
            />
          </div>
        </React.Fragment>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapState = (state, ownProps) => {
  let currentSession, currentRoute, initialValues;

  if (state.firebase.auth.uid && state.firestore.ordered) {
    const id = ownProps.match.params.id,
      urlTarget = id.split("_"),
      session = urlTarget[0],
      routeName = urlTarget[urlTarget.length - 1];
    initialValues = state.firestore.ordered[session];
    currentSession = session;
    currentRoute = routeName;
  }
  return {
    session: currentSession,
    route: currentRoute,
    initialValues,
    user: state.firebase.profile
  };
};

export default compose(
  connect(mapState),
  firestoreConnect((session, route) => routeDetailedQuery(session, route))
)(EditRoute);
