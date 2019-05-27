import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { reducer as FormReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import TrackerReducer from "../components/tracker/TrackerReducer";
import AdultReducer from "../components/leaderboard/adultdivision/AdultReducer";
import BannerReducer from "../components/layout/banner/bannerreducer/BannerReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  season: TrackerReducer,
  adult: AdultReducer,
  toastr: toastrReducer,
  registerUser: BannerReducer
});

export default rootReducer;
