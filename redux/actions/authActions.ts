import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_CURRENT_USER_SIGNUP,
} from "../types";

export const setCurrentUser = (user: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export const setCurrentUserSignup = (user: any) => {
  return {
    type: SET_CURRENT_USER_SIGNUP,
    payload: user,
  };
};

export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};
