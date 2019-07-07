import React, { Component } from "react";
import { Link } from "react-router-dom";
import { closeAlert } from "../../admin page/AdminActions";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AlertDisplay extends Component {
  closeAlert = type => {
    const { closeAlert } = this.props;
    closeAlert(type);
  };

  render() {
    const { messageAlert, welcomeMessage, profile } = this.props;
    return (
      <React.Fragment>
        <div
          className={
            profile.alert && profile.alert.messageAlert
              ? "alert alert-success"
              : "hide"
          }
        >
          <span
            onClick={() => this.closeAlert("messageAlert")}
            style={{
              float: "right",
              fontSize: "1.5rem",
              cursor: "pointer"
            }}
          >
            &times;
          </span>
          <p>{messageAlert && messageAlert.body}</p>
        </div>

        <div
          className={
            profile.alert && profile.alert.welcomeMessage
              ? "alert alert-warning"
              : "hide"
          }
        >
          <span
            onClick={() => this.closeAlert("welcomeMessage")}
            style={{
              float: "right",
              fontSize: "1.5rem",
              cursor: "pointer"
            }}
          >
            &times;
          </span>
          <div style={{ marginTop: "50px" }}>
            <p>{welcomeMessage && welcomeMessage.body}</p>
            <br />
            <Link to="/rules">
              <div className="text-center pb-3">
                <span>
                  <i className="far fa-arrow-alt-circle-right fa-2x mr-2" />
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "-3px",
                    fontSize: "1.3rem"
                  }}
                >
                  Rules
                </span>
              </div>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const actions = {
  closeAlert
};

const mapState = state => {
  let messageAlert, welcomeMessage;
  if (state.firestore.ordered.alerts) {
    messageAlert = state.firestore.ordered.alerts[0];
    welcomeMessage = state.firestore.ordered.alerts[1];
  }
  return {
    messageAlert,
    welcomeMessage
  };
};

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect([{ collection: "alerts" }])
)(AlertDisplay);
