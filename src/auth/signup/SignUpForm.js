import React, { Component } from "react";
import TextInput from "../../common/form/TextInput";
import DateInput from "../../common/form/DateInput";
import RadioInput from "../../common/form/RadioInput";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import { registerUser } from "../AuthActions";
import { toastr } from "react-redux-toastr";
import { withRouter } from "react-router-dom";

const validate = combineValidators({
  firstName: isRequired("First Name"),
  lastName: isRequired("Last Name"),
  dateOfBirth: isRequired("Date of Birth"),
  email: isRequired("Email"),
  password: isRequired("Password"),
  confirmPassword: isRequired("Confirm Password"),
  gender: isRequired("Gender")
});

class SignUpForm extends Component {
  registerUser = async user => {
    const { registerUser, history } = this.props;

    // Check to see if gender is selected and passwords match
    if (user.password !== user.confirmPassword) {
      toastr.error("Error", "Passwords doesn't match");
    } else {
      try {
        await registerUser(user);
        // Redirect
        history.push("/tracker");
      } catch (error) {
        console.log(error);
        toastr.error("Error", "Could Not Create profile");
      }
    }
  };

  render() {
    const { handleSubmit, initialValues } = this.props;

    return (
      <form onSubmit={handleSubmit(this.registerUser)}>
        <div className="form-group">
          <label className="signup-form-label" htmlFor="firstName">
            First Name
          </label>
          <Field name="firstName" type="text" component={TextInput} />
        </div>
        <div className="form-group">
          <label className="signup-form-label" htmlFor="lastName">
            Last Name
          </label>
          <Field name="lastName" type="text" component={TextInput} />
        </div>

        <div className="d-flex">
          <label className="mr-2 signup-form-label">Gender: </label>
          <Field
            type="radio"
            name="gender"
            value="male"
            label="Male"
            component={RadioInput}
          />

          <Field
            type="radio"
            name="gender"
            value="female"
            label="Female"
            component={RadioInput}
          />
        </div>

        <div className="form-group">
          <label className="signup-form-label" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <Field
            name="dateOfBirth"
            dateFormat="MM-DD-YYYY"
            showYearDropdown={true}
            showMonthDropdown={true}
            dopdownMode="select"
            component={DateInput}
          />
        </div>
        <div className="form-group">
          <label className="signup-form-label" htmlFor="email">
            Email
          </label>
          <Field name="email" type="email" component={TextInput} />
        </div>
        <div className="form-group">
          <label className="signup-form-label" htmlFor="password">
            Password
          </label>
          <Field name="password" type="password" component={TextInput} />
        </div>
        <div className="form-group">
          <label className="signup-form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <Field name="confirmPassword" type="password" component={TextInput} />
        </div>
        <button type="submit" className="btn sign-up-btn">
          Sign Up
        </button>
      </form>
    );
  }
}

const mapState = state => ({
  initialValues: state.registerUser.user
});

const actions = {
  registerUser
};

export default withRouter(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "RegisterForm", enableReinitialize: true, validate })(
      SignUpForm
    )
  )
);
