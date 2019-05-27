import { FETCH_REGISTER_USER } from "../bannerconstants/BannerConstants";

const inititialState = {
  user: {}
};

export default (state = inititialState, action) => {
  switch (action.type) {
    case FETCH_REGISTER_USER:
      return {
        ...state,
        user: action.user
      };

    default:
      return state;
  }
};
