import { FETCH_SESSION, FETCH_ATTEMPTS } from "./TrackerConstants";
import firebase from "../../config/firebase";

export const getRoutesForTracker = lastRoute => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore(),
    routesRef = firestore.collection(`session1`); // Change this value for each session view change

  try {
    let startAfter =
      lastRoute &&
      (await firestore
        .collection(`${lastRoute.session}`)
        .doc(lastRoute.routeName)
        .get());

    let query;

    lastRoute
      ? (query = routesRef
          .orderBy("routeGrade")
          .startAfter(startAfter)
          .limit(4))
      : (query = routesRef.orderBy("routeGrade").limit(4));

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
    dispatch({ type: FETCH_SESSION, payload: routes });
    return querySnap;
  } catch (error) {
    console.log(error);
  }
};
