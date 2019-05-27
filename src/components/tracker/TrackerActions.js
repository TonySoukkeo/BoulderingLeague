import { FETCH_SEASON } from "./TrackerConstants";
import firebase from "../../config/firebase";

export const getRoutesForTracker = lastRoute => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore(),
    routesRef = firestore.collection(`season1`);

  try {
    let startAfter =
      lastRoute &&
      (await firestore
        .collection(`${lastRoute.season}`)
        .doc(lastRoute.routeName)
        .get());

    let query;

    lastRoute
      ? (query = routesRef
          .where("datePosted", "<=", today)
          .orderBy("datePosted")
          .startAfter(startAfter)
          .limit(4))
      : (query = routesRef
          .where("datePosted", "<=", today)
          .orderBy("datePosted")
          .limit(4));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      return;
    }

    let routes = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = {
        ...querySnap.docs[i].data()
      };

      routes.push(evt);
    }
    dispatch({ type: FETCH_SEASON, payload: routes });
    return querySnap;
  } catch (error) {
    console.log(error);
  }
};
