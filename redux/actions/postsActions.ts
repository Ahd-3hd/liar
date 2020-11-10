import { ADD_COMMENT, ADD_POST, TOGGLE_REVEAL } from "../types";

export function addPost(postData: any) {
  return (dispatch: any) =>
    setTimeout(() => {
      dispatch({
        type: ADD_POST,
        payload: postData,
      });
    }, 1000);
}

export function addComment(commentData: any) {
  return (dispatch: any) =>
    setTimeout(
      () =>
        dispatch({
          type: ADD_COMMENT,
          payload: commentData,
        }),
      1000
    );
}

export function toggleReveal(commentData: any) {
  return (dispatch: any) =>
    setTimeout(
      () => dispatch({ type: TOGGLE_REVEAL, payload: commentData }),
      1000
    );
}
