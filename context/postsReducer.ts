import { ADD_POST } from "./types";

const addPost = (post: any, state: { posts: any }) => {
  const newPosts = [
    ...state.posts,
    { ...post, postId: state.posts.length + 1 },
  ];
  return {
    ...state,
    posts: newPosts,
  };
};

export default (state: { posts: any }, action: { type: any; payload: any }) => {
  switch (action.type) {
    case ADD_POST:
      return addPost(action.payload, state);
    default:
      return state;
  }
};
