import { toastr } from "react-redux-toastr";

export const changeSessionOnlineStatus = session => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db.collection("ActiveSession").doc(`${session}`);

  try {
    // Change sessions online status on firestore
    firestore.set(`ActiveSession/${session}`, {
      onlineStatus: true
    });

    // Loop through every other session and toggle their view off.
    const allSessions = db.collection("ActiveSession");

    allSessions.get().then(res => {
      res.docs.filter(x => {
        let filteredSessions = [];
        if (x.id !== session) {
          filteredSessions.push(x.id);
        } else {
          return filteredSessions;
        }

        // Loop through every other sessions and turn their status to offline
        filteredSessions.map(
          x => {
            firestore.set(`ActiveSession/${x}`, {
              onlineStatus: false
            });
          },
          {
            merge: true
          }
        );
      });
    });

    toastr.success("Success", "Session has been set to online");
  } catch (err) {
    console.log(err);
    toastr.error("Oops", "There was an issue on changing the status");
  }
};

export const changeSessionOfflineStatus = session => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db.collection("ActiveSession").doc(`${session}`);

  try {
    // Change sessions online status on firestore
    firestore.set(`ActiveSession/${session}`, {
      onlineStatus: false
    });

    // Loop through every other session and toggle their view off.
    const allSessions = db.collection("ActiveSession");

    allSessions.get().then(res => {
      res.docs.filter(x => {
        let filteredSessions = [];
        if (x.id !== session) {
          filteredSessions.push(x.id);
        } else {
          return filteredSessions;
        }

        // Loop through every other sessions and turn their status to offline
        filteredSessions.map(
          x => {
            firestore.set(`ActiveSession/${x}`, {
              onlineStatus: false
            });
          },
          {
            merge: true
          }
        );
      });
    });

    toastr.success("Success", "Session has been set to offline");
  } catch (err) {
    console.log(err);
    toastr.error("Oops", "There was an issue on changing the status");
  }
};
