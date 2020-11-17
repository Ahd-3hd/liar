import { IPost } from "../../interfaces/posts";
import { ADD_COMMENT, ADD_POST, TOGGLE_REVEAL, FETCH_POSTS } from "../types";

let initialState: IPost[] = [];

const postsReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POSTS: {
      return [...payload];
    }
    case ADD_POST: {
      return [
        {
          id: payload.id,
          userId: payload.userId,
          email: payload.email,
          realQuestion: payload.realQuestion,
          fakeQuestion: payload.fakeQuestion,
          isRevealed: false,
          comments: [],
          avatar: payload.avatar,
          commentorsIds: payload.commentorsIds,
        },
        ...state,
      ];
    }
    case ADD_COMMENT: {
      const copyState = [...state];
      const postIndex = copyState.findIndex(
        (item) => item.id === payload.postId
      );
      copyState[postIndex].comments = payload.comments;
      if (copyState[postIndex].commentorsIds.includes(payload.userId)) {
        copyState[postIndex].isRevealed = true;
        return [...copyState];
      } else {
        copyState[postIndex].commentorsIds.push(payload.userId);
        return [...copyState];
      }
    }
    case TOGGLE_REVEAL: {
      const copyState = [...state];
      const newState = copyState.map((item) =>
        item.id === payload.postId
          ? {
              ...item,
              isRevealed: !item.isRevealed,
            }
          : item
      );
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer;
