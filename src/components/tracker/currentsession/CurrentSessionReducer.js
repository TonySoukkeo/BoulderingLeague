import { CURRENT_SESSION } from "./CurrentSessionConstants";

const initialState = {
  currentSession: ""
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SESSION:
      return {
        ...state,
        currentSession: action.payload
      };

    default:
      return state;
  }
};

export default sessionReducer;
