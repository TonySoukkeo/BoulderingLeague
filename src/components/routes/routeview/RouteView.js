import React, { Component } from "react";
import { viewRouteDetailedQuery } from "../routeQuery";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class RouteView extends Component {
  render() {
    const { season, routeName, route } = this.props;

    if (route && season) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto mt-5">
              <NavLink to="/tracker" className="back-btn">
                <i className="fas fa-arrow-circle-left" /> Back to Tracker
              </NavLink>

              <div className="card mt-3">
                <div className="card-header text-center">{routeName}</div>
                <ul className="list-group">
                  {route.map(user => (
                    <li key={user.id} className="list-group-item leaderboard">
                      <Link to={`/${user.id}`}>
                        <img
                          style={{
                            borderRadius: "50%",
                            width: "3rem",
                            height: "100%",
                            marginRight: "4px"
                          }}
                          src={user.photoUrl || `/assets/user.png`}
                          alt=""
                        />{" "}
                        {user.firstName} {user.lastName}{" "}
                      </Link>
                      <p style={{ float: "right", marginTop: "10px" }}>
                        <span className="font-weight-bold"> Division: </span>
                        {user.division}
                      </p>
                    </li>
                  ))}
                </ul>
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

const mapState = (state, ownProps) => {
  let currentSeason, currentRoute, route;

  if (state.firebase.auth.uid && state.firestore.ordered) {
    const id = ownProps.match.params.id,
      urlTarget = id.split("_"),
      season = urlTarget[0],
      routeName = urlTarget[urlTarget.length - 1];
    currentSeason = season;
    currentRoute = routeName;
    route = state.firestore.ordered[season];
  }

  return {
    season: currentSeason,
    routeName: currentRoute,
    route
  };
};

export default compose(
  connect(mapState),
  firestoreConnect((season, routeName) =>
    viewRouteDetailedQuery(season, routeName)
  )
)(RouteView);
