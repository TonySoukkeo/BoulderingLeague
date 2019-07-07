import React, { Component } from "react";
import SelectInput from "../../../common/form/SelectInput";
import ActiveSessionToggle from "./ActiveSessionToggle";
import {
  changeSessionOnlineStatus,
  changeSessionOfflineStatus
} from "./ActiveSessionActions";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class SessionSelector extends Component {
  updateSessionStatusOnline = session => {
    const { changeSessionOnlineStatus } = this.props;

    changeSessionOnlineStatus(session);
  };

  updateSessionStatusOffline = session => {
    const { changeSessionOfflineStatus } = this.props;
    changeSessionOfflineStatus(session);
  };
  render() {
    const { currentSession, sessions } = this.props;

    let onlineStatus;
    if (sessions) {
      sessions.filter(session => {
        if (session.id === currentSession) {
          onlineStatus = session.onlineStatus;
        }
      });
    }

    return (
      <div style={{ float: "right" }}>
        <div className="input-group">
          <span
            style={{
              fontSize: "1.2rem",
              marginRight: "10px",
              marginTop: "5px"
            }}
          >
            Session1
          </span>

          <div className="input-group-prepend ml-3">
            <ActiveSessionToggle
              onlineStatus={onlineStatus}
              currentSession={currentSession}
              updateSessionStatusOffline={this.updateSessionStatusOffline}
              updateSessionStatusOnline={this.updateSessionStatusOnline}
            />
          </div>
        </div>
      </div>
    );
  }
}

const actions = {
  changeSessionOnlineStatus,
  changeSessionOfflineStatus
};

const mapState = state => {
  return {
    sessions: state.firestore.ordered.ActiveSession
  };
};

export default compose(
  connect(
    mapState,
    actions
  ),
  reduxForm({
    form: "updateSessionStatus",
    enableReinitialize: true
  }),
  firestoreConnect([{ collection: "ActiveSession" }])
)(SessionSelector);
