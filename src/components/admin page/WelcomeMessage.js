import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import Textarea from "../../common/form/TextArea";

class WelcomeMessage extends Component {
  updateWelcomeMessage = message => {
    const { updateAlert } = this.props;
    let type;
    for (let x in message) {
      type = {
        type: x,
        body: message[x]
      };
    }
    updateAlert(type);
  };
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.updateWelcomeMessage)}>
        <Field
          name="welcomeMessage"
          type="text"
          component={Textarea}
          rows={6}
          className="form-control"
        />
        <button
          disabled={pristine || submitting}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

const mapState = state => {
  let initialValues;
  if (state.firestore.ordered.alerts) {
    initialValues = {
      welcomeMessage: state.firestore.ordered.alerts[1].body
    };
  } else {
    return initialValues;
  }
  return {
    initialValues
  };
};

export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "alerts" }]),
  reduxForm({ form: "welcomeMessage", enableReinitialize: true })
)(WelcomeMessage);
