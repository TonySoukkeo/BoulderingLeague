import {
  GET_GRADE,
  GET_NAME,
  GET_ACHIEVEMENT,
  GET_SESSION,
  GET_USER_LEVEL,
  GET_MAIN_LEVEL,
  GET_SESSION_VIEW
} from "./ProfileConstants";

const initialState = {
  grade: {},
  name: {},
  achievement: [],
  session: {},
  userLevel: {},
  mainLevel: {}
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADE:
      return {
        ...state,
        grade: action.payload
      };

    case GET_NAME:
      return {
        ...state,
        name: action.payload
      };

    case GET_ACHIEVEMENT:
      return {
        ...state,
        achievement: action.payload
      };

    case GET_SESSION:
      return {
        ...state,
        session: action.payload
      };

    case GET_USER_LEVEL:
      return {
        ...state,
        userLevel: action.payload
      };

    case GET_MAIN_LEVEL:
      return {
        ...state,
        mainLevel: action.payload
      };

    default:
      return state;
  }
};

export default ProfileReducer;
