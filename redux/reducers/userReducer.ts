import { IUser } from "../../interfaces/user";
import { SIGN_IN, SIGN_IN_ERROR } from "../types";

const initialState: IUser = {
  userId: null,
  username: null,
  email: null,
  isLoggedIn: false,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN: {
      console.log(payload);
      return {
        ...state,
        isLoggedIn: true,
        email: payload.email,
        username: payload.email,
        userId: payload.uid,
      };
    }
    case SIGN_IN_ERROR: {
      console.log(payload);
      return state;
    }
    default:
      return state;
  }
};

export default userReducer;
