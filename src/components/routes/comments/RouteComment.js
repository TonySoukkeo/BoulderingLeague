import React, { Component } from "react";
import format from "date-fns/format";
import { routeCommentQuery } from "../routeQuery";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { addComment, deleteComment } from "../actions/CommentActions";

import CommentForm from "./CommentForm";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class RouteComment extends Component {
  state = {
    season: "",
    routeName: ""
  };

  componentDidMount() {
    const url = this.props.match.params.id,
      routePath = url.split("_"),
      season = routePath[0],
      routeName = routePath[routePath.length - 1];

    // Set state
    this.setState({
      season,
      routeName
    });
  }

  // Add Comment to Routes
  addComment = async comment => {
    const { addComment, profile, reset } = this.props,
      { season, routeName } = this.state;

    await addComment(comment, profile, season, routeName);

    // Reset Form field value
    reset();
  };

  // Delete Comment
  onClickDeleteComment = async (comment, season, routeName) => {
    const { deleteComment } = this.props;

    await deleteComment(comment, season, routeName);
  };

  goBack = () => {
    const { history } = this.props;

    // Go back to previous page
    history.goBack();
  };

  render() {
    const { profile, handleSubmit, comments } = this.props,
      { season, routeName } = this.state;

    if (season && profile) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 mt-3">
              <button onClick={this.goBack} className="btn back-btn btn-lg">
                <i className="fas fa-arrow-circle-left" /> Back
              </button>

              <CommentForm
                handleSubmit={handleSubmit}
                addComment={this.addComment}
                season={season}
                comments={comments}
                routeName={routeName}
                profile={profile}
                onClickDeleteComment={this.onClickDeleteComment}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapState = (state, ownProps) => {
  let currentSeason, currentRoute;

  if (state.firebase.auth.uid) {
    const id = ownProps.match.params.id,
      urlTarget = id.split("_"),
      season = urlTarget[0],
      routeName = urlTarget[urlTarget.length - 1];
    currentSeason = season;
    currentRoute = routeName;
  }

  return {
    season: currentSeason,
    routeName: currentRoute,
    profile: state.firebase.profile,
    comments: state.firestore.ordered[currentSeason]
  };
};

const actions = {
  addComment,
  deleteComment
};

export default withRouter(
  compose(
    connect(
      mapState,
      actions
    ),
    firestoreConnect((season, routeName) =>
      routeCommentQuery(season, routeName)
    )
  )(reduxForm({ form: "commentForm" })(RouteComment))
);
