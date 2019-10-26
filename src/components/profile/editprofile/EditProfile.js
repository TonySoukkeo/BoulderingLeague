import React from "react";
import { connect } from "react-redux";
import { updateProfile } from "../../../auth/AuthActions";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../common/form/TextInput";
import TextArea from "../../../common/form/TextArea";

const EditProfile = ({ handleSubmit, updateProfile, pristine, submitting }) => {
  return (
    <React.Fragment>
      <form
        className="profile__edit-form"
        onSubmit={handleSubmit(updateProfile)}
      >
        <div className="form-group">
          <label className="form__label" htmlFor="firstName">
            First Name
          </label>
          <Field
            name="firstName"
            component={TextInput}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="firstName">
            Last Name
          </label>
          <Field
            name="lastName"
            component={TextInput}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="firstName">
            About
          </label>
          <Field
            name="about"
            type="text"
            component={TextArea}
            rows={6}
            className="form-control"
          />
        </div>

        <button
          disabled={pristine || submitting}
          className="btn profile__edit-form--btn"
        >
          Save changes
        </button>
      </form>
    </React.Fragment>
  );
};

const mapState = state => {
  let profile = {};

  if (state.firebase.profile) {
    profile = state.firebase.profile;
  }
  return {
    initialValues: profile
  };
};

const actions = {
  updateProfile
};

export default connect(
  mapState,
  actions
)(reduxForm({ form: "userProfile", enableReinitialize: true })(EditProfile));
