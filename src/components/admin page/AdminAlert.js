import React, { Component } from "react";
import WelcomeMessage from "./WelcomeMessage";
import MessageAlert from "./MessageAlert";
import { updateAlert } from "./AdminActions";
import { connect } from "react-redux";

class AdminAlert extends Component {
  render() {
    const { display, updateAlert } = this.props;
    return (
      <div className={display ? "card" : "hide"}>
        <div className="card-body">
          <h3>Welcome Message</h3>
          <WelcomeMessage updateAlert={updateAlert} />
          <br />
          <br />
          <h3>Message Alert</h3>
          <MessageAlert updateAlert={updateAlert} />
        </div>
      </div>
    );
  }
}

const actions = {
  updateAlert
};

export default connect(
  null,
  actions
)(AdminAlert);
