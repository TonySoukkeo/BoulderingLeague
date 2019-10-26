import {
  GET_OVERALL_LEADERBOARD,
  GET_YOUTH_LEADERBOARD,
  GET_ADULT_LEADERBOARD
} from "./LeaderboardConstants";

const initialState = {
  youth: [],
  adult: [],
  overall: []
};

const LeaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_YOUTH_LEADERBOARD:
      return {
        ...state,
        youth: action.payload
      };

    case GET_ADULT_LEADERBOARD:
      return {
        ...state,
        adult: action.payload
      };

    case GET_OVERALL_LEADERBOARD:
      return {
        ...state,
        overall: action.payload
      };

    default:
      return state;
  }
};

export default LeaderboardReducer;
