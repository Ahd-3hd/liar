import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  currentUser: userReducer,
});

export default rootReducer;
