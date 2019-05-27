import React from "react";
import { connect } from "react-redux";
import { updateProfile } from "../../../auth/AuthActions";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../common/form/TextInput";
import TextArea from "../../../common/form/TextArea";

const EditProfile = ({ handleSubmit, updateProfile, pristine, submitting }) => {
  return (
    <div className="card mb-5">
      <div className="card-header">
        <h3>My Profile</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(updateProfile)}>
          <div className="form-group">
            <label style={{ fontWeight: "bold" }} htmlFor="firstName">
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
            <label style={{ fontWeight: "bold" }} htmlFor="firstName">
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
            <label style={{ fontWeight: "bold" }} htmlFor="firstName">
              About Yourself
            </label>
            <Field
              name="about"
              type="text"
              component={TextArea}
              rows={6}
              className="form-control"
            />
          </div>
          <hr />
          <button
            disabled={pristine || submitting}
            style={{ float: "right" }}
            className="btn btn-success"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
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
