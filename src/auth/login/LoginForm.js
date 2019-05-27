import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import { withRouter } from "react-router-dom";
import TextInput from "../../common/form/TextInput";
import { toastr } from "react-redux-toastr";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password")
});

class LoginForm extends Component {
  userSignIn = async user => {
    const { loginUser, reset, history } = this.props;
    try {
      await loginUser(user);
      history.push("/tracker");
    } catch (error) {
      toastr.error("Oops", "Invalid Login Credentials");
    }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.userSignIn)}>
        <div className="form-group">
          <label className="signup-form-label" htmlFor="email">
            Email
          </label>
          <Field
            name="email"
            type="email"
            component={TextInput}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="signup-form-label" htmlFor="email">
            Password
          </label>
          <Field
            name="password"
            component={TextInput}
            type="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default withRouter(
  reduxForm({ form: "loginForm", validate })(LoginForm)
);
