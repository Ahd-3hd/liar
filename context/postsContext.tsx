import { createContext } from "react";
const initialState = {
  posts: [],
};
const postsContext = createContext({
  posts: initialState.posts,
  addPost: (post: any) => {},
});

export default postsContext;
