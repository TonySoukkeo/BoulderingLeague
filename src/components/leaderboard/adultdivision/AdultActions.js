import { FETCH_ADULT } from "../LeaderboardConstants";
import firebase from "../../../config/firebase";

export const getAdultDivision = () => async (dispatch, getState) => {
  const firestore = firebase.firestore(),
    users = firestore.collection("users");

  const test = await firestore.collection("users").get();
  console.log(test);
};
