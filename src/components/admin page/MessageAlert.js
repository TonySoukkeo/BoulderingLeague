import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import Textarea from "../../common/form/TextArea";

class MessageAlert extends Component {
  updateMessageAlert = message => {
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
      <form onSubmit={handleSubmit(this.updateMessageAlert)}>
        <Field
          name="messageAlert"
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
      messageAlert: state.firestore.ordered.alerts[0].body
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
  reduxForm({ form: "messageAlert", enableReinitialize: true })
)(MessageAlert);
