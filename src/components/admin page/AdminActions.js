import { toastr } from "react-redux-toastr";

// CHANGE USER PERMISSIONS
export const changeUserPermissions = user => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  try {
    // map through user and update user permissions on firestore database
    user.map(x => {
      firestore.set(
        `users/${x.uid}`,
        {
          permission: x.permission
        },
        {
          merge: true
        }
      );
    });
    toastr.success("Success", "Users updated");
  } catch (err) {
    console.log(err);
    toastr.error("Oops", "Something went wrong");
  }
};

// UPDATE USER ALERT STATUS
export const updateAlert = message => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db.collection("users");

  try {
    // Loop through every member and change their messageAlert status to true

    collection
      .get()
      .then(res => {
        res.docs.map(x => {
          const uid = x.data().uid;

          // Update user alerts from firestore
          firestore.set(
            `users/${uid}`,
            {
              alert: {
                [message.type]: true
              }
            },
            {
              merge: true
            }
          );
        });
      })
      .catch(err => console.log(err));

    // Add message to firestore collection
    await firestore.set(`alerts/${message.type}`, {
      body: message.body
    });

    toastr.success("Success", "Alert has been updated");
  } catch (err) {
    console.log(err);
    toastr.error("Oops", "Something went wrong");
  }
};

// Turn alert status to false
export const closeAlert = type => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db.collection("users");

  // Loop through every member and change their messageAlert status to true

  collection
    .get()
    .then(res => {
      res.docs.map(x => {
        const uid = x.data().uid;

        // Update user alerts from firestore
        firestore.set(
          `users/${uid}`,
          {
            alert: {
              [type]: false
            }
          },
          {
            merge: true
          }
        );
      });
    })
    .catch(err => console.log(err));
};
