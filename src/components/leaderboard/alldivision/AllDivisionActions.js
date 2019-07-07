import { FETCH_ALL } from "../LeaderboardConstants";

/*
  FUNCTION USED TO GRAB ALL USERS AND ADD THEM UP UNDER OVERALL FROM TOTAL AMOUNT OF POINTS.
*/

export const getAllDivision = currentSession => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db.collection("users");

  let totalUsers = [];

  await collection.get().then(snapshot => {
    snapshot.forEach(doc => {
      if (
        doc.data().hasOwnProperty("session") &&
        doc.data().session[currentSession] !== 0
      ) {
        totalUsers.push({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          session: doc.data().session[currentSession],
          uid: doc.data().uid,
          photoURL: doc.data().photoURL
        });
      }
    });
  });

  /*
    SORT USERS BY POINTS
  */

  const sortUser = totalUsers.sort((a, b) => b.session - a.session);

  dispatch({
    type: FETCH_ALL,
    payload: sortUser
  });
};
