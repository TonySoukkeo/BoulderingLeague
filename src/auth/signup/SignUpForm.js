import React, { Component } from "react";
import TextInput from "../../common/form/TextInput";
import RadioInput from "../../common/form/RadioInput";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  matchesField,
  composeValidators
} from "revalidate";
import { registerUser } from "../AuthActions";
import { toastr } from "react-redux-toastr";
import { withRouter } from "react-router-dom";
import { CLOSE_MODAL } from "../../components/modals/modalsaction/ModalConstants";
import { modalToggle } from "../../components/modals/modalsaction/ModalsAction";
import Spinner from "../../common/helpers/Spinner";

const validate = combineValidators({
  firstName: isRequired("First Name"),
  lastName: isRequired("Last Name"),
  dateOfBirth: isRequired("Date of Birth"),
  email: isRequired("Email"),
  password: composeValidators(
    isRequired("Password"),
    hasLengthGreaterThan(7)({
      message: "Must be at least 8 characters long"
    })
  )(),
  confirmPassword: matchesField("password")({
    message: "passwords do not match"
  }),
  gender: isRequired("Gender")
});

class SignUpForm extends Component {
  registerUser = async user => {
    const { registerUser, history } = this.props;

    // Check to see if gender is selected and passwords match
    if (user.password !== user.confirmPassword) {
      toastr.error("Error", "Passwords doesn't match");
    } else {
      await registerUser(user, history);
    }
  };

  closeModal = () => {
    const { modalToggle } = this.props;

    modalToggle(CLOSE_MODAL);
  };

  render() {
    const { handleSubmit, registerModal, loading } = this.props;

    return (
      <div
        className={
          registerModal ? "popup popup-lg popup-active" : "popup popup-lg"
        }
      >
        <i onClick={this.closeModal} className="fas fa-times popup__icon"></i>

        <form className="form" onSubmit={handleSubmit(this.registerUser)}>
          <div className="form__group">
            <label className="form__label" htmlFor="firstName">
              First Name
            </label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              component={TextInput}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="lastName">
              Last Name
            </label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              component={TextInput}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Gender: </label>
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
          <div className="form__group">
            <label className="form__label" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <Field
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              component={TextInput}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <Field id="email" name="email" type="email" component={TextInput} />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              Password
            </label>

            <Field
              id="password"
              name="password"
              type="password"
              component={TextInput}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              component={TextInput}
            />
          </div>
          <button type="submit" className="btn form__btn">
            Register
          </button>
        </form>
        {loading ? <Spinner /> : null}
      </div>
    );
  }
}

const mapState = state => ({
  initialValues: state.registerUser.user,
  registerModal: state.modal.registerModal,
  loading: state.loading.loading
});

const actions = {
  registerUser,
  modalToggle
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
