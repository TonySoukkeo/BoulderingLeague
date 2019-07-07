import { FETCH_ALL } from "./LeaderboardConstants";

const initialState = {
  overallUsers: []
};

const LeaderBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        overallUsers: action.payload
      };
    default:
      return state;
  }
};

export default LeaderBoardReducer;
