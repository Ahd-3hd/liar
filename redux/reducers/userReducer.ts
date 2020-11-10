import { IUser } from "../../interfaces/user";
import { SIGN_IN } from "../types";

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
      return state;
    }
    default:
      return state;
  }
};

export default userReducer;
