import { IPost } from "../../interfaces/posts";
import { ADD_COMMENT, ADD_POST, TOGGLE_REVEAL } from "../types";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../config/config";

let initialState: IPost[] = [];
const db = firebase.firestore();
db.collection("posts")
  .get()
  .then((querySnapshot) => {
    const newState: IPost[] = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      newState.push({
        id: doc.id,
        userId: doc.data().userid,
        fakeQuestion: doc.data().fakeQuestion,
        realQuestion: doc.data().realQuestion,
        isRevealed: false,
        comments: doc.data().comments,
      });
      initialState = newState;
    });
  });

const postsReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POST: {
      return [
        ...state,
        {
          id: uuidv4(),
          userId: "123",
          realQuestion: payload.realQuestion,
          fakeQuestion: payload.fakeQuestion,
          isRevealed: false,
          comments: [],
        },
      ];
    }
    case ADD_COMMENT: {
      const copyState = [...state];
      const postIndex = copyState.findIndex(
        (item) => item.id === payload.postId
      );
      copyState[postIndex].comments.push({
        id: uuidv4(),
        username: "ahd",
        text: payload.commentText,
      });
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
