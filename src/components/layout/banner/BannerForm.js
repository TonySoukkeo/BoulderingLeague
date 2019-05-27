import React, { Component } from "react";
import { getRegisterUser } from "../banner/banneractions/BannerActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class BannerForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: ""
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  registerUser = (firstName, lastName, email) => {
    const { getRegisterUser, history } = this.props,
      user = {
        firstName,
        lastName,
        email
      };

    getRegisterUser(user);
    // redirect to sign up page
    history.push("/signup");
  };

  render() {
    const { firstName, lastName, email } = this.state;
    return (
      <div className="card">
        <div className="card-header text-light text-center">
          <h3>Sign Up!</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <input
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                type="text"
                className="form-control form-control-lg"
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <input
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                type="text"
                className="form-control form-control-lg"
                placeholder="Last Name"
              />
            </div>

            <div className="form-group">
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
              />
            </div>

            <hr className="signup-hr" />

            <button
              onClick={() => this.registerUser(firstName, lastName, email)}
              style={{ float: "right" }}
              className="btn btn-lg signup-btn"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const actions = {
  getRegisterUser
};

const mapState = state => ({
  initialState: state.registerUser
});

export default withRouter(
  connect(
    mapState,
    actions
  )(BannerForm)
);
