import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { combineReducers } from "redux";
import posts from "./posts/postsSlice";
import auth from "./auth/authSlice";
const reducer = combineReducers({
  posts: posts,
  auth: auth,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
