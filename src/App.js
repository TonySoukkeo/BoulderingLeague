import React, { Component } from "react";
import "./index.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import HomePage from "./components/layout/homepage/HomePage";
import Tracker from "./components/tracker/Tracker";
import NavBar from "./components/layout/navbar/NavBar";
import Profile from "./components/profile/Profile";
import UploadImage from "./components/profile/uploadimage/UploadImage";
import Login from "./auth/login/Login";
import SignUp from "./auth/signup/SignUp";
import EditRoute from "../src/components/routes/EditRoute";
import RouteView from "./components/routes/routeview/RouteView";
import UserProfile from "./components/profile/user/userprofile/UserProfile";
import AdultLeaderboard from "./components/leaderboard/adultdivision/AdultLeaderboard";
import YouthLeaderboard from "./components/leaderboard/youthdivision/YouthLeaderboard";
import RouteComment from "./components/routes/comments/RouteComment";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./common/helpers/auth";
import { Provider } from "react-redux";
import { ConfigureStore } from "./store/ConfigureStore";
import ReduxToastr from "react-redux-toastr";

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <div className="App">
            <NavBar />
            <Switch>
              <Route
                exact
                path="/"
                component={UserIsNotAuthenticated(HomePage)}
              />
              <Route
                exact
                path="/tracker"
                component={UserIsAuthenticated(Tracker)}
              />
              <Route
                exact
                path="/profile"
                component={UserIsAuthenticated(Profile)}
              />
              <Route
                exact
                path="/profile/upload"
                component={UserIsAuthenticated(UploadImage)}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/signup"
                component={UserIsNotAuthenticated(SignUp)}
              />
              <Route
                exact
                path="/leaderboard/adult/:id"
                component={UserIsAuthenticated(AdultLeaderboard)}
              />
              <Route
                exact
                path="/leaderboard/youth/:id"
                component={UserIsAuthenticated(YouthLeaderboard)}
              />
              <Route
                exact
                path="/comments/:id"
                component={UserIsAuthenticated(RouteComment)}
              />
              <Route
                exact
                path="/:id"
                component={UserIsAuthenticated(UserProfile)}
              />
              <Route
                exact
                path="/route/edit/:id"
                component={UserIsAuthenticated(EditRoute)}
              />
              <Route
                exact
                path="/view/:id"
                component={UserIsAuthenticated(RouteView)}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
