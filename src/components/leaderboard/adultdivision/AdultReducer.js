import { FETCH_ADULT } from "../LeaderboardConstants";

const initialState = [];

const AdultReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADULT:
      return action.payload;

    default:
      return state;
  }
};

export default AdultReducer;
