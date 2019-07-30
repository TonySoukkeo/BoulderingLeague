import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import RoutesIntermission from "../../common/helpers/RoutesIntermission";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class DisplayRoute extends Component {
  render() {
    const {
      routes,
      user,
      currentSession,
      currentUser,
      auth,
      routeNotComplete,
      completeRoute,
      routeAttemptsAdd,
      routeAttemptsMinus,
      onClickDelete,
      activeSession
    } = this.props;

    let onlineStatus;
    if (activeSession) {
      activeSession.filter(x => {
        if (x.id === currentSession) {
          onlineStatus = x.onlineStatus;
        }
      });
    }
    let hasProp;
    if (currentUser && currentUser.hasOwnProperty("attempts")) {
      hasProp = true;
    } else {
      hasProp = false;
    }
    let display;
    if (
      (!onlineStatus && currentUser.permission === "admin") ||
      currentUser.permission === "route setter"
    ) {
      display = (
        <div>
          {routes &&
            user &&
            routes.map(route => (
              <div key={route.uid} className="card mb-5">
                <div className="card-header">
                  <h3>
                    {route.routeName}{" "}
                    <Link to={`/comments/${route.session}_${route.routeName}`}>
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
                          {route.hasOwnProperty("commentCount") ? (
                            <span
                              className={
                                route.commentCount !== 0 ? "text-success" : null
                              }
                            >
                              ({route.commentCount})
                            </span>
                          ) : (
                            `(0)`
                          )}
                        </span>
                      </span>
                    </Link>
                  </h3>
                </div>
                <div
                  style={{
                    position: "relative"
                  }}
                  className="card-body"
                >
                  <p style={{ float: "right", fontWeight: "bold" }}>
                    <Link
                      className="have-climbed test"
                      to={`/view/${route.session}_${route.routeName}`}
                    >
                      {route.total === 1 &&
                        ` ${route.total} person has climbed`}
                      {route.total > 1 && `${route.total} people have climbed`}
                    </Link>
                  </p>

                  <h5
                    className={
                      route.routeGrade === "v0"
                        ? "v0"
                        : route.routeGrade === "v1"
                        ? "v1"
                        : route.routeGrade === "v2"
                        ? "v2"
                        : route.routeGrade === "v3"
                        ? "v3"
                        : route.routeGrade === "v4"
                        ? "v4"
                        : route.routeGrade === "v5"
                        ? "v5"
                        : route.routeGrade === "v6"
                        ? "v6"
                        : route.routeGrade === "v7"
                        ? "v7"
                        : "special"
                    }
                  >
                    {route.routeGrade === "special" ? "sp" : route.routeGrade}
                  </h5>

                  <p>
                    {route.description}{" "}
                    <span
                      style={{
                        float: "right"
                      }}
                    >
                      <img
                        style={{
                          height: "150px",
                          width: "183px"
                        }}
                        src={route.location}
                        alt="Route Location"
                      />
                    </span>{" "}
                  </p>

                  <p style={{ position: "absolute", bottom: "0" }}>
                    Posted by:{" "}
                    <span className="font-weight-bold">{route.postedBy}</span>
                  </p>
                </div>

                <div className="card-footer">
                  {currentUser.completed && currentUser.completed[route.uid] ? (
                    <div>
                      <button
                        onClick={() =>
                          routeNotComplete(auth, route, currentUser)
                        }
                        name={route.routeName}
                        style={{ float: "right" }}
                        className="btn btn-completed"
                      >
                        Sent!
                      </button>
                      <div
                        style={{
                          float: "left",
                          marginRight: "100px",
                          marginTop: "5px",
                          display: "flex"
                        }}
                      >
                        <span>
                          <i className="far fa-plus-square fa-2x attempt-plus-complete" />
                        </span>
                        <span>
                          <i className="far fa-minus-square ml-2 mr-3 fa-2x attempt-minus-complete" />
                        </span>
                        <div style={{ marginTop: "4px" }}>
                          <span
                            style={{
                              textTransform: "uppercase"
                            }}
                          >
                            Attempts:{" "}
                            {(hasProp &&
                              currentUser.attempts[route.session][route.uid] &&
                              currentUser.attempts[route.session][route.uid]
                                .attempts) ||
                              0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => completeRoute(auth, route, currentUser)}
                        style={{ float: "right" }}
                        disabled={
                          hasProp &&
                          currentUser.attempts.hasOwnProperty(route.session) &&
                          currentUser.attempts[route.session][route.uid] &&
                          currentUser.attempts[route.session][route.uid]
                            .attempts !== 0
                            ? false
                            : true
                        }
                        className="btn btn-not-completed"
                      >
                        Complete
                      </button>
                      <div
                        style={{
                          float: "left",
                          marginRight: "100px",
                          marginTop: "5px",
                          display: "flex"
                        }}
                      >
                        <span>
                          <i
                            onClick={() =>
                              routeAttemptsAdd(auth, route, currentUser)
                            }
                            className="far fa-plus-square fa-2x attempt-plus"
                          />
                        </span>
                        <span>
                          <i
                            onClick={() =>
                              routeAttemptsMinus(auth, route, currentUser)
                            }
                            className={
                              currentUser.hasOwnProperty("attempts") &&
                              currentUser.attempts[route.session] &&
                              currentUser.attempts[route.session][route.uid] &&
                              currentUser.attempts[route.session][route.uid]
                                .attempts !== 0
                                ? "far fa-minus-square ml-2 mr-3 fa-2x attempt-minus"
                                : "far fa-minus-square ml-2 mr-3 fa-2x"
                            }
                          />
                        </span>
                        <div style={{ marginTop: "4px" }}>
                          <span
                            style={{
                              textTransform: "uppercase"
                            }}
                          >
                            Attempts:{" "}
                            {(hasProp &&
                              currentUser.attempts.hasOwnProperty(
                                route.session
                              ) &&
                              currentUser.attempts[route.session][route.uid] &&
                              currentUser.attempts[route.session][route.uid]
                                .attempts) ||
                              0}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {currentUser.permission === "admin" ||
                currentUser.permission === "route setter" ? (
                  <div
                    style={{
                      background: "#1e1e1e",
                      textAlign: "center",
                      paddingBottom: "20px"
                    }}
                  >
                    <Link
                      to={`/route/edit/${route.session}_${route.routeName}`}
                    >
                      <button className="btn btn-outline-success mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => onClickDelete(route)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      );
    } else if (onlineStatus) {
      display = (
        <div>
          {routes &&
            user &&
            routes.map(route => (
              <div key={route.uid} className="card mb-5">
                <div className="card-header">
                  <h3>
                    {route.routeName}{" "}
                    <Link to={`/comments/${route.session}_${route.routeName}`}>
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
                          {route.hasOwnProperty("commentCount") ? (
                            <span
                              className={
                                route.commentCount !== 0 ? "text-success" : null
                              }
                            >
                              ({route.commentCount})
                            </span>
                          ) : (
                            `(0)`
                          )}{" "}
                        </span>
                      </span>
                    </Link>
                  </h3>
                </div>
                <div
                  style={{
                    position: "relative"
                  }}
                  className="card-body"
                >
                  <p style={{ float: "right", fontWeight: "bold" }}>
                    <Link
                      className="have-climbed test"
                      to={`/view/${route.session}_${route.routeName}`}
                    >
                      {route.total === 1 &&
                        ` ${route.total} person has climbed`}
                      {route.total > 1 && `${route.total} people have climbed`}
                    </Link>
                  </p>

                  <h5
                    className={
                      route.routeGrade === "v0"
                        ? "v0"
                        : route.routeGrade === "v1"
                        ? "v1"
                        : route.routeGrade === "v2"
                        ? "v2"
                        : route.routeGrade === "v3"
                        ? "v3"
                        : route.routeGrade === "v4"
                        ? "v4"
                        : route.routeGrade === "v5"
                        ? "v5"
                        : route.routeGrade === "v6"
                        ? "v6"
                        : route.routeGrade === "v7"
                        ? "v7"
                        : "special"
                    }
                  >
                    {route.routeGrade === "special" ? "sp" : route.routeGrade}
                  </h5>

                  <p>
                    {route.description}
                    <span
                      style={{
                        float: "right"
                      }}
                    >
                      <img
                        style={{
                          height: "150px",
                          width: "183px"
                        }}
                        src={route.location}
                        alt="Route Location"
                      />
                    </span>{" "}
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "0"
                    }}
                  >
                    Posted by:{" "}
                    <span className="font-weight-bold">{route.postedBy}</span>
                  </p>
                </div>

                <div className="card-footer">
                  {currentUser.completed && currentUser.completed[route.uid] ? (
                    <div>
                      <button
                        onClick={() =>
                          routeNotComplete(auth, route, currentUser)
                        }
                        name={route.routeName}
                        style={{ float: "right" }}
                        className="btn btn-completed"
                      >
                        Sent!
                      </button>
                      <div
                        style={{
                          float: "left",
                          marginRight: "100px",
                          marginTop: "5px",
                          display: "flex"
                        }}
                      >
                        <span>
                          <i className="far fa-plus-square fa-2x attempt-plus-complete" />
                        </span>
                        <span>
                          <i className="far fa-minus-square ml-2 mr-3 fa-2x attempt-minus-complete" />
                        </span>
                        <div style={{ marginTop: "4px" }}>
                          <span
                            style={{
                              textTransform: "uppercase"
                            }}
                          >
                            Attempts:{" "}
                            {(currentUser.hasOwnProperty("attempts") &&
                              currentUser.attempts[route.session][route.uid] &&
                              currentUser.attempts[route.session][route.uid]
                                .attempts) ||
                              0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => completeRoute(auth, route, currentUser)}
                        style={{ float: "right" }}
                        disabled={
                          currentUser.hasOwnProperty("attempts") &&
                          currentUser.attempts[route.session][route.uid] &&
                          currentUser.attempts[route.session][route.uid]
                            .attempts !== 0
                            ? false
                            : true
                        }
                        className="btn btn-not-completed"
                      >
                        Complete
                      </button>
                      <div
                        style={{
                          float: "left",
                          marginRight: "100px",
                          marginTop: "5px",
                          display: "flex"
                        }}
                      >
                        <span>
                          <i
                            onClick={() =>
                              routeAttemptsAdd(auth, route, currentUser)
                            }
                            className="far fa-plus-square fa-2x attempt-plus"
                          />
                        </span>
                        <span>
                          <i
                            onClick={() =>
                              routeAttemptsMinus(auth, route, currentUser)
                            }
                            className={
                              currentUser.hasOwnProperty("attempts") &&
                              currentUser.attempts[route.session][route.uid] &&
                              currentUser.attempts[route.session][route.uid]
                                .attempts !== 0
                                ? "far fa-minus-square ml-2 mr-3 fa-2x attempt-minus"
                                : "far fa-minus-square ml-2 mr-3 fa-2x"
                            }
                          />
                        </span>
                        <div style={{ marginTop: "4px" }}>
                          <span
                            style={{
                              textTransform: "uppercase"
                            }}
                          >
                            Attempts:{" "}
                            {(currentUser.hasOwnProperty("attempts") &&
                              currentUser.attempts[route.session][route.uid] &&
                              currentUser.attempts[route.session][route.uid]
                                .attempts) ||
                              0}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {currentUser.permission === "admin" ||
                currentUser.permission === "route setter" ? (
                  <div
                    style={{
                      background: "#1e1e1e",
                      textAlign: "center",
                      paddingBottom: "20px"
                    }}
                  >
                    <Link
                      to={`/route/edit/${route.session}_${route.routeName}`}
                    >
                      <button className="btn btn-outline-success mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => onClickDelete(route)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      );
    } else {
      display = (
        <div>
          <h2 className="text-center">New routes coming soon!</h2>
          <RoutesIntermission />
        </div>
      );
    }
    return <div>{display}</div>;
  }
}

const mapState = state => {
  return {
    activeSession: state.firestore.ordered.ActiveSession
  };
};

export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "ActiveSession" }])
)(DisplayRoute);
