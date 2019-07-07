import moment from "moment";
import { toastr } from "react-redux-toastr";
import uuid from "uuid";

// Add comment to route
export const addComment = (comment, profile, session, routeName) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    datePosted = moment(Date.now()).toDate(),
    db = firebase.firestore(),
    collection = db.collection(`${session}`).doc(`${routeName}`),
    commentUid = uuid();

  try {
    // Specify subcollection for comments on route
    const routeSubcollection = {
        collection: `${session}`,
        doc: routeName,
        subcollections: [{ collection: "comments", doc: `${commentUid}` }]
      },
      routeComment = {
        collection: `${session}`,
        doc: routeName
      };

    // Set comments on route
    firestore.set(routeSubcollection, {
      datePosted,
      firstName: profile.firstName,
      lastName: profile.lastName,
      photoUrl: profile.photoURL || "assets/user.png",
      comment: comment.comment,
      permission: profile.permission,
      profileUid: profile.uid,
      commentUid
    });

    // Check to see if route as comments property
    collection.get().then(res => {
      let comments;
      if (res.data().hasOwnProperty("commentCount")) {
        comments = res.data().commentCount;

        // set comment count on route
        firestore.set(
          `${session}/${routeName}`,
          {
            commentCount: (comments += 1)
          },
          {
            merge: true
          }
        );
      } else {
        comments = 0;

        firestore.set(
          `${session}/${routeName}`,
          {
            commentCount: (comments += 1)
          },
          {
            merge: true
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Could not add comment");
  }
};

// Delete Comment
export const deleteComment = (comment, session, routeName) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db.collection(`${session}`).doc(`${routeName}`);

  try {
    const comments = {
      collection: `${session}`,
      doc: `${routeName}`,
      subcollections: [{ collection: "comments", doc: `${comment.commentUid}` }]
    };

    // Delete comment
    firestore.delete(comments);

    // Remove comment counter from route

    collection.get().then(res => {
      let comments = res.data().commentCount;

      firestore.set(
        `${session}/${routeName}`,
        {
          commentCount: (comments -= 1)
        },
        {
          merge: true
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};
