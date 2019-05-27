import React, { Component } from "react";
import UserProfileLeft from "./UserProfileLeft";
import UserProfileRight from "./UserProfileRight";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

class UserProfile extends Component {
  state = {
    id: ""
  };

  componentDidMount() {
    const uid = this.props.match.params.id;

    this.setState({
      id: uid
    });
  }

  goBack = () => {
    const { history } = this.props;

    // Go back to previous page
    history.goBack();
  };

  render() {
    const { users } = this.props,
      { id } = this.state;

    let currentUser = [];

    if (users && id)
      users.map(x => {
        if (x.id === id) {
          currentUser = x;
        }
      });

    if (currentUser && users) {
      return (
        <div className="container">
          <button
            style={{ marginTop: "30px" }}
            onClick={this.goBack}
            className="btn back-btn btn-lg"
          >
            <i className="fas fa-arrow-circle-left" /> Back
          </button>

          <div className="row">
            <UserProfileLeft currentUser={currentUser} />
            <UserProfileRight currentUser={currentUser} />
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapState = state => ({
  users: state.firestore.ordered.users
});

export default withRouter(
  compose(
    connect(mapState),
    firestoreConnect([{ collection: "users" }])
  )(UserProfile)
);
