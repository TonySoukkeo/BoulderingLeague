import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import RoutesIntermission from "../../common/helpers/RoutesIntermission";
import RouteView from "./routeview/RouteView";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { completed } from "./routeview/RouteViewAction";
import { modalToggle } from "../modals/modalsaction/ModalsAction";
import {
  HAVE_CLIMBED_OPEN,
  CLOSE_MODAL
} from "../modals/modalsaction/ModalConstants";

class DisplayRoute extends Component {
  state = {
    session: null,
    routeName: null,
    completedBy: null
  };

  openModal = async (session, routeName) => {
    const { completed, modalToggle } = this.props;
    const completedBy = await completed(session, routeName);

    modalToggle(HAVE_CLIMBED_OPEN);

    this.setState({
      session,
      routeName,
      completedBy
    });
  };

  closeModal = () => {
    const { modalToggle } = this.props;

    modalToggle(CLOSE_MODAL);

    this.setState({
      session: null,
      currentRoute: null,
      route: null
    });
  };

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
      activeSession,
      haveClimbedModal
    } = this.props;

    const { routeName, completedBy } = this.state;

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
        <React.Fragment>
          {routes &&
            user &&
            routes.map(route => (
              <div key={route.uid} className="tracker-routes">
                <div className="tracker-card">
                  {/* CARD HEADER */}
                  <div className="tracker-card__header">
                    <div className="tracker-card__header-name">
                      {route.routeName}
                    </div>
                    {/* COMMENTS */}
                    <Link
                      to={`/comments/${route.session}_${route.routeName}`}
                      className="tracker-card__header-comments"
                    >
                      <i className="fas fa-comments tracker-card__icon"></i>(
                      {route.hasOwnProperty("commentCount") ? (
                        <span
                          className={
                            route.commentCount !== 0 ? "text-success" : null
                          }
                        >
                          {route.commentCount}
                        </span>
                      ) : (
                        0
                      )}
                      )
                    </Link>
                  </div>
                  <div className="tracker-card__grade">
                    <span>
                      {route.routeGrade === "special" ? "sp" : route.routeGrade}
                    </span>
                  </div>

                  {/* PEOPLE WHO HAD CLIMBED */}

                  <div
                    onClick={() =>
                      this.openModal(route.session, route.routeName, route)
                    }
                    className="tracker-card__climbed"
                  >
                    {route.total === 1 && `${route.total} person has climbed`}
                    {route.total > 1 && `${route.total} people have climbed`}
                    {!route.total ? `0 people have climbed` : ""}
                  </div>

                  {/* CARD BODY */}
                  <div className="tracker-card__content">
                    <div className="tracker-card__content-desc">
                      {route.description}
                    </div>
                    <div className="tracker-card__content-map">
                      <img
                        className="tracker-card__content-img"
                        src={route.location}
                        alt="Route Location"
                      />
                    </div>
                  </div>
                  {/* ROUTE ATTEMPTS */}
                  {currentUser.completed && currentUser.completed[route.uid] ? (
                    <React.Fragment>
                      <div className="tracker-card__attempts">
                        {/* ATTEMPTS ICONS */}
                        <div className="tracker-card__attempts-box">
                          {/* ROUTE COMPLETED */}
                          <button className="tracker-card__attempts-btn text-grey">
                            <i className="fas fa-minus"></i>
                          </button>
                          <button className="tracker-card__attempts-btn text-grey">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="tracker-card__attempts-results">
                          {(hasProp &&
                            currentUser.attempts.hasOwnProperty([
                              route.session
                            ]) &&
                            currentUser.attempts[route.session][route.uid] &&
                            currentUser.attempts[route.session][route.uid]
                              .attempts) ||
                            0}{" "}
                          attempts
                        </div>
                      </div>
                      <div className="tracker-card__footer">
                        {/* EDIT / DELETE ROUTE */}
                        {currentUser.permission === "admin" ||
                        currentUser.permission === "route setter" ? (
                          <div className="tracker-card__footer-admin">
                            <Link
                              to={`/route/edit/${route.session}_${route.routeName}`}
                            >
                              <span>
                                <i className="far fa-edit"></i>
                              </span>
                            </Link>
                            <span>
                              <i
                                onClick={() => onClickDelete(route)}
                                className="far fa-trash-alt"
                              ></i>
                            </span>
                          </div>
                        ) : null}

                        <button
                          onClick={() =>
                            routeNotComplete(auth, route, currentUser)
                          }
                          className="tracker-card__footer-submit text-success"
                        >
                          Sent!
                        </button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div className="tracker-card__attempts">
                        {/* ATTEMPTS ICONS */}
                        <div className="tracker-card__attempts-box">
                          {/* ROUTE COMPLETED */}
                          <button
                            onClick={() =>
                              routeAttemptsMinus(auth, route, currentUser)
                            }
                            className={
                              currentUser.hasOwnProperty("attempts") &&
                              currentUser.attempts.hasOwnProperty([
                                route.session
                              ]) &&
                              currentUser.attempts[route.session][route.uid] &&
                              currentUser.attempts[route.session][route.uid]
                                .attempts !== 0
                                ? "tracker-card__attempts-btn"
                                : "tracker-card__attempts-btn disabled"
                            }
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <button className="tracker-card__attempts-btn">
                            <i
                              onClick={() =>
                                routeAttemptsAdd(auth, route, currentUser)
                              }
                              className="fas fa-plus"
                            ></i>
                          </button>
                        </div>
                        {/** ATTEMPTS **/}
                        <div className="tracker-card__attempts-results">
                          {(hasProp &&
                            currentUser.attempts.hasOwnProperty(
                              route.session
                            ) &&
                            currentUser.attempts[route.session][route.uid] &&
                            currentUser.attempts[route.session][route.uid]
                              .attempts) ||
                            0}{" "}
                          attempts
                        </div>
                      </div>
                      <div className="tracker-card__footer">
                        {/* EDIT / DELETE ROUTE */}
                        {currentUser.permission === "admin" ||
                        currentUser.permission === "route setter" ? (
                          <div className="tracker-card__footer-admin">
                            <Link
                              to={`/route/edit/${route.session}_${route.routeName}`}
                            >
                              <span>
                                <i className="far fa-edit"></i>
                              </span>
                            </Link>
                            <span>
                              <i
                                onClick={() => onClickDelete(route)}
                                className="far fa-trash-alt"
                              ></i>
                            </span>
                          </div>
                        ) : null}

                        <button
                          onClick={() =>
                            completeRoute(auth, route, currentUser)
                          }
                          disabled={
                            hasProp &&
                            currentUser.attempts.hasOwnProperty(
                              route.session
                            ) &&
                            currentUser.attempts[route.session][route.uid] &&
                            currentUser.attempts[route.session][route.uid]
                              .attempts !== 0
                              ? false
                              : true
                          }
                          className="tracker-card__footer-submit text-danger"
                        >
                          Complete
                        </button>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            ))}
        </React.Fragment>
      );
    } else if (onlineStatus) {
      display = (
        <React.Fragment>
          {routes &&
            user &&
            routes.map(route => (
              <div key={route.uid} className="tracker-routes">
                <div className="tracker-card">
                  {/* CARD HEADER */}
                  <div className="tracker-card__header">
                    <div className="tracker-card__header-name">
                      {route.routeName}
                    </div>
                    {/* COMMENTS */}
                    <Link
                      to={`/comments/${route.session}_${route.routeName}`}
                      className="tracker-card__header-comments"
                    >
                      <i className="fas fa-comments tracker-card__icon"></i>(
                      {route.hasOwnProperty("commentCount") ? (
                        <span
                          className={
                            route.commentCount !== 0 ? "text-success" : null
                          }
                        >
                          {route.commentCount}
                        </span>
                      ) : (
                        0
                      )}
                      )
                    </Link>
                  </div>
                  <div className="tracker-card__grade">
                    <span>
                      {route.routeGrade === "special" ? "sp" : route.routeGrade}
                    </span>
                  </div>

                  {/* PEOPLE WHO HAD CLIMBED */}
                  <div
                    onClick={() =>
                      this.openModal(route.session, route.routeName, route)
                    }
                    className="tracker-card__climbed"
                  >
                    {route.total === 1 && `${route.total} person has climbed`}
                    {route.total > 1 && `${route.total} people have climbed`}
                    {!route.total ? "0 people have climbed" : ""}
                  </div>

                  {/* CARD BODY */}
                  <div className="tracker-card__content">
                    <div className="tracker-card__content-desc">
                      {route.description}
                    </div>
                    <div className="tracker-card__content-map">
                      <img
                        className="tracker-card__content-img"
                        src={route.location}
                        alt="Route Location"
                      />
                    </div>
                  </div>
                  {/* ROUTE ATTEMPTS */}
                  {currentUser.completed && currentUser.completed[route.uid] ? (
                    <React.Fragment>
                      <div className="tracker-card__attempts">
                        {/* ATTEMPTS ICONS */}
                        <div className="tracker-card__attempts-box">
                          {/* ROUTE COMPLETED */}
                          <button className="tracker-card__attempts-btn text-grey">
                            <i className="fas fa-minus"></i>
                          </button>
                          <button className="tracker-card__attempts-btn text-grey">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="tracker-card__attempts-results">
                          {(currentUser.hasOwnProperty("attempts") &&
                            currentUser.attempts.hasOwnProperty([
                              route.session
                            ]) &&
                            currentUser.attempts[route.session][route.uid] &&
                            currentUser.attempts[route.session][route.uid]
                              .attempts) ||
                            0}{" "}
                          attempts
                        </div>
                      </div>
                      <div className="tracker-card__footer">
                        {/* EDIT / DELETE ROUTE */}
                        {currentUser.permission === "admin" ||
                        currentUser.permission === "route setter" ? (
                          <div className="tracker-card__footer-admin">
                            <Link
                              to={`/route/edit/${route.session}_${route.routeName}`}
                            >
                              <span>
                                <i className="far fa-edit"></i>
                              </span>
                            </Link>
                            <span>
                              <i
                                onClick={() => onClickDelete(route)}
                                className="far fa-trash-alt"
                              ></i>
                            </span>
                          </div>
                        ) : null}

                        <button
                          onClick={() =>
                            routeNotComplete(auth, route, currentUser)
                          }
                          className="tracker-card__footer-submit text-success"
                        >
                          Sent!
                        </button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div className="tracker-card__attempts">
                        {/* ATTEMPTS ICONS */}
                        <div className="tracker-card__attempts-box">
                          {/* ROUTE COMPLETED */}

                          <button
                            className={
                              currentUser.hasOwnProperty("attempts") &&
                              currentUser.attempts.hasOwnProperty([
                                route.session
                              ]) &&
                              currentUser.attempts[route.session][route.uid] &&
                              currentUser.attempts[route.session][route.uid]
                                .attempts !== 0
                                ? "tracker-card__attempts-btn"
                                : "tracker-card__attempts-btn disabled"
                            }
                          >
                            <i
                              onClick={() =>
                                routeAttemptsMinus(auth, route, currentUser)
                              }
                              className="fas fa-minus"
                            ></i>
                          </button>
                          <button className="tracker-card__attempts-btn">
                            <i
                              onClick={() =>
                                routeAttemptsAdd(auth, route, currentUser)
                              }
                              className="fas fa-plus"
                            ></i>
                          </button>
                        </div>
                        {/** ATTEMPTS **/}
                        <div className="tracker-card__attempts-results">
                          {(currentUser.hasOwnProperty("attempts") &&
                            currentUser.attempts.hasOwnProperty([
                              route.session
                            ]) &&
                            currentUser.attempts[route.session][route.uid] &&
                            currentUser.attempts[route.session][route.uid]
                              .attempts) ||
                            0}{" "}
                          attempts
                        </div>
                      </div>
                      <div className="tracker-card__footer">
                        {/* EDIT / DELETE ROUTE */}
                        {currentUser.permission === "admin" ||
                        currentUser.permission === "route setter" ? (
                          <div className="tracker-card__footer-admin">
                            <Link
                              to={`/route/edit/${route.session}_${route.routeName}`}
                            >
                              <span>
                                <i className="far fa-edit"></i>
                              </span>
                            </Link>
                            <span>
                              <i
                                onClick={() => onClickDelete(route)}
                                className="far fa-trash-alt"
                              ></i>
                            </span>
                          </div>
                        ) : null}

                        <button
                          onClick={() =>
                            completeRoute(auth, route, currentUser)
                          }
                          disabled={
                            currentUser.hasOwnProperty("attempts") &&
                            currentUser.attempts.hasOwnProperty([
                              route.session
                            ]) &&
                            currentUser.attempts[route.session][route.uid] &&
                            currentUser.attempts[route.session][route.uid]
                              .attempts !== 0
                              ? false
                              : true
                          }
                          className="tracker-card__footer-submit text-danger"
                        >
                          Complete
                        </button>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            ))}
        </React.Fragment>
      );
    } else {
      display = (
        <div>
          <h2 className="text-center">New routes coming soon!</h2>
          <RoutesIntermission />
        </div>
      );
    }
    return (
      <React.Fragment>
        {/** ROUTE DISPLAY **/}
        {display}

        {/** COMPLETED BY VIEW **/}
        <RouteView
          haveClimbedModal={haveClimbedModal}
          completedBy={completedBy}
          routeName={routeName}
          closeModal={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

const actions = {
  completed,
  modalToggle
};

const mapState = state => {
  return {
    activeSession: state.firestore.ordered.ActiveSession,
    haveClimbedModal: state.modal.haveClimbedModal
  };
};

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect([{ collection: "ActiveSession" }])
)(DisplayRoute);
