import React from "react";
import CommentInput from "../../../common/form/CommentInput";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const CommentForm = ({
  handleSubmit,
  addComment,
  session,
  comments,
  routeName,
  profile,
  onClickDeleteComment
}) => {
  return (
    <form onSubmit={handleSubmit(addComment)} className="route-comments__form">
      <div className="route-comments__form-header">
        <h3>{routeName}</h3>
      </div>

      <ul className="route-comments__form-list">
        {comments && comments.length !== 0 ? (
          <React.Fragment>
            {comments.map(comment => (
              <li
                className="route-comments__form-item"
                key={comment.commentUid}
              >
                <div className="route-comments__form-detail">
                  {/*** PROFILE IMAGE ***/}
                  <Link to={`/${comment.profileUid}`}>
                    {comment.photoUrl && (
                      <img
                        className="route-comments__form-profile-img"
                        src={comment.photoUrl}
                        alt="profile"
                      />
                    )}{" "}
                  </Link>

                  {/*** PROFILE NAME ***/}
                  <Link
                    to={`/${comment.profileUid}`}
                    className="route-comments__form-name"
                  >
                    {comment.firstName} {comment.lastName}
                  </Link>

                  {comment.permission === "admin" && (
                    <span>
                      <i className="fab fa-react fa-1x" /> Admin
                    </span>
                  )}
                </div>
                <div className="route-comments__form-comment">
                  {comment.comment}

                  <div className="route-comments__form-timestamp">
                    <div className="route-comments__form-timestamp--date">
                      {format(comment.datePosted, "MMM D YYYY")}{" "}
                    </div>

                    <div className="route-comments__form-timestamp--time">
                      {format(comment.datePosted, "h:mm")}{" "}
                      {format(comment.datePosted, "aa")}
                    </div>
                  </div>

                  {profile.uid === comment.profileUid ||
                  profile.permission === "admin" ||
                  profile.permission === "router setter" ? (
                    <button
                      onClick={() =>
                        onClickDeleteComment(comment, session, routeName)
                      }
                      type="button"
                      className="btn route-comments__form-delete"
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </React.Fragment>
        ) : (
          <div className="route-comments__na">
            <div className="route-comments__na-text">
              Be the first to comment
            </div>
          </div>
        )}
      </ul>

      {/*** ROUTE COMMENT INPUT ***/}

      <div className="route-comments__form-input-group">
        <Field
          name="comment"
          type="text"
          placeholder="Enter comment"
          component={CommentInput}
        />

        <button className="btn route-comments__btn" type="submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
