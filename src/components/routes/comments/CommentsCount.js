import React, { Component } from "react";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class CommentsCount extends Component {
  state = {
    routeComment: null
  };

  componentDidMount() {
    const { routeName, session } = this.props,
      { routeComment } = this.state;

    this.setState({
      routeComment: {
        name: routeName,
        session
      }
    });
  }

  render() {
    return <span>0</span>;
  }
}

export default CommentsCount;
