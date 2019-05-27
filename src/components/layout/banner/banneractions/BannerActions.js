import { FETCH_REGISTER_USER } from "../bannerconstants/BannerConstants";

export const getRegisterUser = user => {
  return {
    type: FETCH_REGISTER_USER,
    user
  };
};
