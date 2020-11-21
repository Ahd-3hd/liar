import { useState } from "react";
import { addPost } from "../redux/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import firebase, { auth } from "../config/config";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  Button,
  HintButton,
  HintOverlay,
  HintParagraph,
} from "../styles/NewQuestion.style";

export default function NewQuestion() {
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    realQuestion: "",
    fakeQuestion: "",
  });

  const addPostDispatch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!currentUser) return router.push("/login/");
    const newPost = {
      userId: currentUser.userId,
      email: currentUser.email,
      realQuestion: postData.realQuestion,
      fakeQuestion: postData.fakeQuestion,
      isRevealed: false,
      comments: [],
      createdAt: firebase.firestore.Timestamp.now().seconds,
      avatar: currentUser.avatar,
      commentorsIds: [],
    };
    const docRef = await firebase.firestore().collection("posts").add(newPost);
    dispatch(
      addPost({
        ...newPost,
        id: docRef.id,
      })
    );
    setPostData({
      realQuestion: "",
      fakeQuestion: "",
    });
  };

  return (
    <Form onSubmit={addPostDispatch}>
      <Input
        type="text"
        required
        placeholder='FAKE QUESTION "appears first"'
        onChange={(e) =>
          setPostData({ ...postData, fakeQuestion: e.target.value })
        }
        value={postData.fakeQuestion}
      />
      <Input
        type="text"
        required
        placeholder='REAL QUESTION "appears after comment"'
        onChange={(e) =>
          setPostData({ ...postData, realQuestion: e.target.value })
        }
        value={postData.realQuestion}
      />
      <Button type="submit">POST</Button>
      <HintButton
        onClick={() => setShowHint((prevState) => !prevState)}
        type="button"
      >
        What is this?
      </HintButton>
      <HintOverlay showHint={showHint}>
        <HintParagraph>
          This is a work in progress social media platform (more features
          coming)
        </HintParagraph>
        <HintParagraph>
          The Point of it is some sort of a silly game
        </HintParagraph>
        <HintParagraph>
          1- the fake question is to bait answers from people eg: how old are
          you?
        </HintParagraph>
        <HintParagraph>
          2- the real question is the question that will make the answer sound
          funny eg: What's your I.Q. ?
        </HintParagraph>
        <HintParagraph>
          3- this will make it look like as if someone said that his/her I.Q. is
          eg: 28.
        </HintParagraph>
        <HintParagraph>
          4- People can only see the real question after they comment/answer.
        </HintParagraph>
        <HintParagraph>5- get creative *wink wink*</HintParagraph>
      </HintOverlay>
    </Form>
  );
}
