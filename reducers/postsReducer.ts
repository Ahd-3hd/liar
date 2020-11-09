import { Action } from "redux";

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

const postsReducer = (state = initialState, action: Action) => {
  return state;
};

export default postsReducer;
