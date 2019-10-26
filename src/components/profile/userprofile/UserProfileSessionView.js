import React, { Component } from "react";
import format from "date-fns/format";
import { connect } from "react-redux";
import {
  SESSION_OPEN,
  CLOSE_MODAL
} from "../../modals/modalsaction/ModalConstants";
import { modalToggle } from "../../modals/modalsaction/ModalsAction";

class UserProfileSessionView extends Component {
  state = {
    session: null
  };

  openSession = session => {
    const { modalToggle } = this.props;

    // Sort array by route grade
    const sortSession = session.sort((a, b) => {
      if (a.grade > b.grade) return 1;
      else if (b.grade > a.grade) return -1;
      else return 0;
    });

    this.setState({
      session: sortSession
    });

    modalToggle(SESSION_OPEN);
  };

  closeSession = () => {
    const { modalToggle } = this.props;
    this.setState({ session: null });

    modalToggle(CLOSE_MODAL);
  };

  render() {
    const { completedSession, modal } = this.props,
      { session } = this.state;

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
                onClick={() => this.openSession(session[1])}
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

        <div className={modal ? "popup popup-active session-modal" : "popup"}>
          <span>
            <i
              onClick={this.closeSession}
              className="fas fa-times session-modal--icon"
            ></i>
          </span>
          <div className="session-modal__content">
            {session && session.length > 0 ? (
              session.map(value => (
                <div className="session-modal__content-box">
                  <div className="session-modal__name">{value.routeName}</div>

                  <div className="session-modal__grade">
                    {value.grade === "special" ? "SP" : value.grade}
                  </div>

                  <div className="session-modal__completed">
                    Completed on: {format(value.completedOn, "MMMM D YYYY")}
                  </div>
                </div>
              ))
            ) : (
              <div className="session-modal__na">
                <i className="far fa-frown-open"></i>
                <h2>No completed routes</h2>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const actions = {
  modalToggle
};

const mapStateToProps = state => ({
  modal: state.modal.sessionModal,
  overlay: state.modal.overlay
});

export default connect(
  mapStateToProps,
  actions
)(UserProfileSessionView);
