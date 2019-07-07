import { FETCH_SESSION } from "./TrackerConstants";

const initialState = [];

const TrackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSION:
      return action.payload;
    default:
      return state;
  }
};

export default TrackerReducer;
