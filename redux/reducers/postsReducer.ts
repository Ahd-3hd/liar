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
        ...state,
        {
          id: payload.id,
          userId: "123",
          realQuestion: payload.realQuestion,
          fakeQuestion: payload.fakeQuestion,
          isRevealed: false,
          comments: [],
        },
      ];
    }
    case ADD_COMMENT: {
      console.log(payload);
      const copyState = [...state];
      const postIndex = copyState.findIndex(
        (item) => item.id === payload.postId
      );
      copyState[postIndex].comments = payload.comments;
      // const copyState = [...payload];
      // console.log(copyState);
      // const postIndex = copyState.findIndex(
      //   (item) => item.id === payload.postId
      // );
      // copyState[postIndex].comments.push({
      //   id: uuidv4(),
      //   username: "ahd",
      //   text: payload.commentText,
      // });
      return [...copyState];
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
