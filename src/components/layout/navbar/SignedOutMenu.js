import React, { Component } from "react";
import { connect } from "react-redux";
import { modalToggle } from "../../modals/modalsaction/ModalsAction";
import LoginForm from "../../../auth/login/LoginForm";
import SignUpForm from "../../../auth/signup/SignUpForm";
import {
  CLOSE_MODAL,
  LOGIN_OPEN,
  REGISTER_OPEN
} from "../../modals/modalsaction/ModalConstants";
import { Link } from "react-router-dom";

class SignedOutMenu extends Component {
  loginFormOpen = () => {
    const { modalToggle } = this.props;
    modalToggle(LOGIN_OPEN);
  };

  registerFormOpen = () => {
    const { modalToggle } = this.props;
    modalToggle(REGISTER_OPEN);
  };

  closeModal = () => {
    const { modalToggle } = this.props;
    modalToggle(CLOSE_MODAL);
  };

  render() {
    const { registerModal, loginModal } = this.props;

    return (
      <React.Fragment>
        <ul className="navbar__list navbar__signedout">
          <div className="navbar__signedout-logo">
            <img src="assets/logo.png" alt="hiline logo" />
          </div>
          <li
            onClick={this.loginFormOpen}
            className="navbar__item navbar__login"
          >
            <a className="navbar__link">
              <i className="fas fa-key navbar__icon"></i> Login
            </a>
          </li>
          <li
            onClick={this.registerFormOpen}
            className="navbar__item navbar__register"
          >
            <a className="navbar__link">
              <i className="fas fa-id-badge navbar__icon"></i>
              Register
            </a>
          </li>
          <Link to="/rules" className="navbar__link navbar__signedout-rules">
            Rules
          </Link>
        </ul>

        <SignUpForm
          registerModal={registerModal}
          closeModal={this.closeModal}
        />
        <LoginForm loginModal={loginModal} closeModal={this.closeModal} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  registerModal: state.modal.registerModal,
  loginModal: state.modal.loginModal
});

const actions = {
  modalToggle
};

export default connect(
  mapStateToProps,
  actions
)(SignedOutMenu);
