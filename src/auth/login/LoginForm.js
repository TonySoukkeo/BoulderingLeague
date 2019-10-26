import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { combineValidators, isRequired } from "revalidate";
import { withRouter } from "react-router-dom";
import TextInput from "../../common/form/TextInput";
import { loginUser } from "../AuthActions";
import { modalToggle } from "../../components/modals/modalsaction/ModalsAction";
import { CLOSE_MODAL } from "../../components/modals/modalsaction/ModalConstants";
import Spinner from "../../common/helpers/Spinner";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password")
});

class LoginForm extends Component {
  userSignIn = async user => {
    const { loginUser, history } = this.props;

    await loginUser(user, history);
  };

  closeModal = () => {
    const { modalToggle } = this.props;

    modalToggle(CLOSE_MODAL);
  };

  render() {
    const { handleSubmit, loginModal, loading } = this.props;

    return (
      <div className={loginModal ? "popup popup-active" : "popup"}>
        <i onClick={this.closeModal} className="fas fa-times popup__icon"></i>

        <form className="form" onSubmit={handleSubmit(this.userSignIn)}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <Field id="email" name="email" type="email" component={TextInput} />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <Field
              id="password"
              name="password"
              component={TextInput}
              type="password"
            />
          </div>
          <button type="submit" className="btn form__btn">
            Login
          </button>
        </form>
        {loading ? <Spinner /> : null}
      </div>
    );
  }
}

const actions = {
  loginUser,
  modalToggle
};

const mapStateToProps = state => ({
  loginModal: state.modal.loginModal,
  loading: state.loading.loading
});

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(withRouter(reduxForm({ form: "loginForm", validate })(LoginForm)));
