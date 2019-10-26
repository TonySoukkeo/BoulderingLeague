import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { reducer as FormReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import BannerReducer from "../components/layout/banner/bannerreducer/BannerReducer";
import ModalsReducer from "../components/modals/modalsreducer/ModalsReducer";
import ProfileReducer from "../components/profile/ProfileReducer";
import asyncReducer from "../common/helpers/async/asyncReducer";
import LeaderboardReducer from "../components/leaderboard/LeaderboardReducer";
import sessionReducer from "../components/tracker/currentsession/CurrentSessionReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  toastr: toastrReducer,
  registerUser: BannerReducer,
  modal: ModalsReducer,
  profile: ProfileReducer,
  loading: asyncReducer,
  leaderboard: LeaderboardReducer,
  currentSession: sessionReducer
});

export default rootReducer;
