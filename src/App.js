import React, { Component } from "react";
import "./css/style.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import HomePage from "./components/layout/homepage/HomePage";
import Tracker from "./components/tracker/Tracker";
import NavBar from "./components/layout/navbar/NavBar";
import Profile from "./components/profile/Profile";
import Rules from "./components/layout/rules/Rules";
import EditRoute from "../src/components/routes/EditRoute";
import AdminPage from "./components/admin page/AdminPage";
import UserProfile from "./components/profile/userprofile/UserProfile";
import DarkOverlay from "./components/overlay/DarkOverlay";
import RouteComment from "./components/routes/comments/RouteComment";
import LoginForm from "./auth/login/LoginForm";
import SignUpForm from "./auth/signup/SignUpForm";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
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
        <React.Fragment>
          <Router>
            <ReduxToastr
              timeOut={4000}
              preventDuplicates
              position="bottom-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
            />

            <div className="App">
              <DarkOverlay />
              <LoginForm />
              <SignUpForm />
              <main className="container">
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
                    path="/profile/:id"
                    component={UserIsAuthenticated(UserProfile)}
                  />

                  <Route
                    exact
                    path="/admin"
                    component={UserIsAuthenticated(AdminPage)}
                  />

                  <Route exact path="/rules" component={Rules} />

                  <Route
                    exact
                    path="/comments/:id"
                    component={UserIsAuthenticated(RouteComment)}
                  />

                  <Route
                    exact
                    path="/route/edit/:id"
                    component={UserIsAuthenticated(EditRoute)}
                  />
                </Switch>
              </main>
            </div>
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
