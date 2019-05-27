import React from "react";
import CommentInput from "../../../common/form/CommentInput";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const CommentForm = ({
  handleSubmit,
  addComment,
  season,
  comments,
  routeName,
  profile,
  onClickDeleteComment
}) => {
  return (
    <form onSubmit={handleSubmit(addComment)}>
      <div className="card fixed-bottom">
        <div className="input-group">
          <Field
            name="comment"
            type="text"
            placeholder="Enter comment"
            component={CommentInput}
          />
          <div className="input-group-append">
            <button className="btn btn-completed" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="card mb-5">
        <div className="card-header text-center">
          <h3>
            {season}: {routeName} comments
          </h3>
        </div>
        <ul className="list-group">
          {comments &&
            comments.map(comment => (
              <li
                key={comment.commentUid}
                className="list-group-item leaderboard"
              >
                <h5>
                  <Link to={`/${comment.profileUid}`}>
                    {comment.photoUrl && (
                      <img
                        style={{
                          width: "45px",
                          marginRight: "10px",
                          borderRadius: "50%"
                        }}
                        src={comment.photoUrl}
                        alt="profile"
                      />
                    )}{" "}
                    <span className="leaderboard-names">
                      {comment.firstName} {comment.lastName}
                    </span>
                  </Link>
                  {comment.admin && (
                    <span style={{ marginLeft: "20px", color: "green" }}>
                      <i className="fab fa-react fa-1x" /> Admin
                    </span>
                  )}

                  <span
                    style={{
                      fontSize: ".9rem",
                      float: "right",
                      color: "black",
                      fontWeight: "bold"
                    }}
                  >
                    {format(comment.datePosted, "MMM D YYYY")}{" "}
                    <span style={{ color: "green", marginLeft: "15px" }}>
                      {format(comment.datePosted, "h:mm")}{" "}
                      {format(comment.datePosted, "aa")}
                    </span>
                  </span>
                </h5>
                <div
                  style={{
                    marginTop: "30px",
                    marginBottom: "10px",
                    padding: "20px",
                    backgroundColor: "rgba(135, 206, 250, .2)"
                  }}
                >
                  <span className="comment-text"> {comment.comment}</span>
                </div>
                {profile.uid === comment.profileUid && (
                  <button
                    onClick={() =>
                      onClickDeleteComment(comment, season, routeName)
                    }
                    type="button"
                    style={{ float: "right" }}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
    </form>
  );
};

export default CommentForm;
