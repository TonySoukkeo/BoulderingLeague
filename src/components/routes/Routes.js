import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { completedRoute, notComplete } from "./RoutesAction";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

class Routes extends Component {
  state = {
    complete: false,
    currentUser: []
  };

  componentWillReceiveProps(prevProps) {
    const user = prevProps.profile;
    this.setState({
      currentUser: user
    });
  }

  onClickComplete = () =>
    this.setState({
      complete: !this.state.complete
    });

  onClickDelete = route => async () => {
    const { deleteRoute } = this.props;

    deleteRoute(route);
  };

  completeRoute = (auth, route, user) => async () => {
    const { completedRoute } = this.props;

    await completedRoute(auth, route, user);
  };

  routeNotComplete = (auth, route, user) => async () => {
    const { notComplete } = this.props;
    await notComplete(auth, route, user);
  };

  render() {
    const { auth, user, getNextRoutes, moreRoutes, routes } = this.props,
      { currentUser } = this.state;

    if (currentUser) {
      return (
        <div>
          {routes && routes.length !== 0 && (
            <InfiniteScroll
              pageStart={0}
              loadMore={getNextRoutes}
              hasMore={moreRoutes}
              initialLoad={false}
            >
              {routes &&
                user &&
                routes.map(route => (
                  <div key={route.uid} className="card mb-5">
                    <div className="card-header">
                      <h3>
                        {route.routeName}{" "}
                        <Link
                          to={`/comments/${route.season}_${route.routeName}`}
                        >
                          <span
                            style={{
                              float: "right",
                              fontSize: "1.2rem",
                              marginTop: "6px"
                            }}
                            className="comments"
                          >
                            <i
                              style={{
                                marginRight: "3px"
                              }}
                              className="fas fa-comments"
                            />{" "}
                            <span style={{ fontSize: ".8rem" }}>
                              {" "}
                              Comments{" "}
                            </span>
                          </span>
                        </Link>
                      </h3>
                    </div>
                    <div className="card-body">
                      <p style={{ float: "right", fontWeight: "bold" }}>
                        <Link
                          className="have-climbed test"
                          to={`/view/${route.season}_${route.routeName}`}
                        >
                          {route.total === 1 &&
                            ` ${route.total} person has climbed`}
                          {route.total > 1 &&
                            `${route.total} people have climbed`}
                        </Link>
                      </p>

                      <h5 className="route-grade">{route.routeGrade}</h5>

                      <p>{route.description}</p>

                      <p style={{ float: "right" }}>
                        Posted by:{" "}
                        <span className="font-weight-bold">
                          {route.postedBy}
                        </span>
                      </p>
                    </div>

                    <div className="card-footer">
                      {currentUser.admin ? (
                        <React.Fragment>
                          <Link
                            to={`/route/edit/${route.season}_${
                              route.routeName
                            }`}
                          >
                            <button className="btn btn-outline-success mr-2">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={this.onClickDelete(route)}
                            className="btn btn-delete"
                          >
                            Delete
                          </button>
                        </React.Fragment>
                      ) : null}

                      {currentUser && currentUser[route.uid] ? (
                        <button
                          onClick={this.routeNotComplete(
                            auth,
                            route,
                            currentUser
                          )}
                          name={route.routeName}
                          style={{ float: "right" }}
                          className="btn btn-completed"
                        >
                          Completed
                        </button>
                      ) : (
                        <button
                          onClick={this.completeRoute(auth, route, currentUser)}
                          style={{ float: "right" }}
                          className="btn btn-not-completed"
                        >
                          Not Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </InfiniteScroll>
          )}
        </div>
      );
    } else {
      return <div>Loadin</div>;
    }
  }
}

const actions = {
  completedRoute,
  notComplete
};

const mapState = state => {
  let uid;

  if (state.firebase.auth.uid && state.firestore.ordered) {
    uid = state.firebase.auth.uid;
  }
  return {
    uid,
    user: state.firestore.ordered.users
  };
};

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect([{ collection: "users" }])
)(Routes);
