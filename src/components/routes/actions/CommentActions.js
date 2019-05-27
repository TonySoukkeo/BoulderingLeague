import moment from "moment";
import { toastr } from "react-redux-toastr";
import uuid from "uuid";

// Add comment to route
export const addComment = (comment, profile, season, routeName) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore(),
    datePosted = moment(Date.now()).toDate(),
    commentUid = uuid();

  try {
    // Specify subcollection for comments on route
    const routeSubcollection = {
      collection: `${season}`,
      doc: routeName,
      subcollections: [{ collection: "comments", doc: `${commentUid}` }]
    };

    // Set comments on route
    firestore.set(routeSubcollection, {
      datePosted,
      firstName: profile.firstName,
      lastName: profile.lastName,
      photoUrl: profile.photoURL || "assets/user.png",
      comment: comment.comment,
      admin: profile.admin,
      profileUid: profile.uid,
      commentUid
    });
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Could not add comment");
  }
};

// Delete Comment
export const deleteComment = (comment, season, routeName) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  try {
    const comments = {
      collection: `${season}`,
      doc: `${routeName}`,
      subcollections: [{ collection: "comments", doc: `${comment.commentUid}` }]
    };

    // Delete comment
    firestore.delete(comments);
  } catch (error) {
    console.log(error);
  }
};
