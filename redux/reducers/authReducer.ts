import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../types";

const initialState = {
  currentUser: null,
};

const authReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: {
          email: payload.email,
          userId: payload.uid,
          username: payload.email,
        },
      };
    }
    case CLEAR_CURRENT_USER: {
      return {
        ...state,
        currentUser: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
