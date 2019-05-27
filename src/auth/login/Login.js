import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { loginUser } from "../AuthActions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  goBack = () => {
    const { history } = this.props;

    // Go back to previous page
    history.goBack();
  };

  render() {
    const { loginUser, history } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div style={{ margin: "auto" }} className="col-md-7">
            <button onClick={this.goBack} className="btn back-btn btn-lg mt-3">
              <i className="fas fa-arrow-circle-left" /> Back
            </button>
            <div className="card mt-2">
              <div className="card">
                <div className="card-header text-center">
                  <h3>
                    <i className="fas fa-lock" /> Login
                  </h3>
                </div>
                <div className="card-body">
                  <LoginForm history={history} loginUser={loginUser} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const actions = {
  loginUser
};

export default withRouter(
  connect(
    null,
    actions
  )(Login)
);
