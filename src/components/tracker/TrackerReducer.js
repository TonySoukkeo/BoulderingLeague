import { FETCH_SEASON } from "./TrackerConstants";

const initialState = [];

const TrackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEASON:
      return action.payload;
    default:
      return state;
  }
};

export default TrackerReducer;
