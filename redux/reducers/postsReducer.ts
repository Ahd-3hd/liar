import { IPost } from "../../interfaces/posts";
import { ADD_POST } from "../types";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    id: 1,
    username: "Ahd",
    realQuestion: "this is the real question",
    fakeQuestion: "this is the fake question",
    isRevealed: true,
    comments: [
      {
        id: 1,
        username: "John Doe",
        text: "hello, this is a comment",
      },
    ],
  },
  {
    id: 2,
    username: "John Doe",
    realQuestion: "this is the real question",
    fakeQuestion: "this is the fake question",
    isRevealed: false,
    comments: [],
  },
];

const postsReducer = (
  state = initialState,
  action: { type: string; payload: IPost }
) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POST:
      return [
        ...state,
        {
          id: uuidv4(),
          username: "ahd",
          realQuestion: payload.realQuestion,
          fakeQuestion: payload.fakeQuestion,
          isRevealed: false,
          comments: [],
        },
      ];
    default:
      return state;
  }
};

export default postsReducer;
