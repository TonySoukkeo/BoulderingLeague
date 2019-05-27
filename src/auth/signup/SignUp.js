import React, { Component } from "react";
import SignUpForm from "./SignUpForm";
import { withRouter } from "react-router-dom";

class SignUp extends Component {
  goBack = () => {
    const { history } = this.props;

    // Go back to previous page.
    history.goBack();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div style={{ margin: "auto" }} className="col-md-7">
            <button onClick={this.goBack} className="btn back-btn btn-lg mt-3">
              <i className="fas fa-arrow-circle-left" /> Back
            </button>
            <div className="card mt-2 mb-5">
              <div className="card">
                <div className="card-header text-center">
                  <h3>
                    <i className="far fa-arrow-alt-circle-right" /> Register
                  </h3>
                </div>
                <div className="card-body">
                  <SignUpForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
