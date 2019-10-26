import React, { Component } from "react";

class SessionView extends Component {
  render() {
    const { completedSession, openSession } = this.props;

    return (
      <React.Fragment>
        <div className="profile__session">
          <div className="profile__session-header">
            <h1 className="header-1">Sessions</h1>
          </div>
          <div className="profile__session-content">
            {Object.entries(completedSession).map(session => (
              <div
                key={session[0]}
                onClick={() => openSession(session[1])}
                className="profile__session-box"
              >
                <div className="profile__session-box-header">
                  <h1 className="header-1"> {session[0]}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/** SESSION MODAL **/}
      </React.Fragment>
    );
  }
}

export default SessionView;
