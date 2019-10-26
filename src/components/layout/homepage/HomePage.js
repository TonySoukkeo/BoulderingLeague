import React, { Component } from "react";
import { Link } from "react-router-dom";
import Banner from "../banner/Banner";
import { connect } from "react-redux";
import { modalToggle } from "../../../components/modals/modalsaction/ModalsAction";
import { REGISTER_OPEN } from "../../../components/modals/modalsaction/ModalConstants";

class HomePage extends Component {
  registerFormOpen = () => {
    const { modalToggle } = this.props;

    modalToggle(REGISTER_OPEN);
  };

  render() {
    return (
      <div className="homepage">
        <header className="mb-med main-header">
          <Banner registerFormModal={this.registerFormOpen} />
        </header>

        <section className="compete">
          <h1 className="header-1 compete__header">Compete</h1>
          <div className="compete__content">
            <p className="text">
              Compete against other local climbers, and climb your way up the
              leaderboards! Get placed in an adult or youth bracket, depending
              on your age.
            </p>
            <br />
            <div className="compete__rules">
              <span className="compete__rules-desc">
                For more information, please check out our rules
              </span>

              <Link to="/rules" className="btn compete__btn">
                Rules
              </Link>
            </div>
          </div>
        </section>

        <section className="earn">
          <h1 className="header-1 earn__header">Earn Badges</h1>
          <div className="earn__content">
            <p className="text ">
              Climbed something cool? Earn special achievements to show off your
              accomplishments!
            </p>

            <div className="earn__badges">
              <div className="earn__badges-1"></div>

              <div className="earn__badges-2"></div>

              <div className="earn__badges-3"></div>
            </div>
          </div>
        </section>

        <section className="join">
          <h2 className="header-2 join__header">Join in on the fun</h2>
          <button onClick={this.registerFormOpen} className="btn join__btn">
            Sign Up
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerModal: state.modal.registerModal,
    loginModal: state.modal.loginModal
  };
};

const actions = {
  modalToggle
};

export default connect(
  mapStateToProps,
  actions
)(HomePage);
