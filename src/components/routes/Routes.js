import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getAchievements,
  removeAchievementXp
} from "../../common/achievements/AchievementsActions";
import { firestoreConnect } from "react-redux-firebase";
import {
  completedRoute,
  notComplete,
  attemptCounterAdd,
  attemptCounterMinus
} from "./RoutesAction";
import DisplayRoute from "./DisplayRoute";

class Routes extends Component {
  state = {
    complete: false,
    currentUser: []
  };

  componentDidMount() {
    const { profile } = this.props;

    this.setState({
      currentUser: profile
    });
  }

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

  onClickDelete = route => {
    const { deleteRoute } = this.props;

    if (window.confirm("Are you sure you want to delete this route?")) {
      deleteRoute(route);
    }
  };

  completeRoute = (auth, route, user) => {
    const { completedRoute, getAchievements } = this.props;
    completedRoute(auth, route, user);

    setTimeout(() => {
      getAchievements(user);
    }, 2000);
  };

  routeNotComplete = (auth, route, user) => {
    const { notComplete, removeAchievementXp } = this.props;
    notComplete(auth, route, user);

    setTimeout(() => {
      removeAchievementXp(user);
    }, 2000);
  };

  routeAttemptsAdd = (auth, route, user) => {
    const { attemptCounterAdd, getAchievements } = this.props;

    attemptCounterAdd(auth, route, user);

    setTimeout(() => {
      getAchievements(user);
    }, 1000);
  };

  routeAttemptsMinus = (auth, route, user) => {
    const { attemptCounterMinus, removeAchievementXp } = this.props;

    attemptCounterMinus(auth, route, user);

    setTimeout(() => {
      removeAchievementXp(user);
    }, 1000);
  };

  render() {
    const { auth, user, routes, currentSession, addRoutes } = this.props,
      { currentUser } = this.state;

    if (currentUser) {
      return (
        <div className={!addRoutes ? " tracker-box" : ""}>
          {routes && routes.length !== 0 && (
            <DisplayRoute
              currentSession={currentSession}
              routeNotComplete={this.routeNotComplete}
              onClickDelete={this.onClickDelete}
              routeAttemptsMinus={this.routeAttemptsMinus}
              routeAttemptsAdd={this.routeAttemptsAdd}
              completeRoute={this.completeRoute}
              auth={auth}
              routes={routes}
              user={user}
              currentUser={currentUser}
            />
          )}
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const actions = {
  completedRoute,
  notComplete,
  attemptCounterAdd,
  attemptCounterMinus,
  getAchievements,
  removeAchievementXp
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
