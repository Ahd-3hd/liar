import {
  Form,
  QuestionGroup,
  TextArea,
  QuestionImg,
} from "../styles/NewQuestion.style";
import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Buttons";
import { addPost } from "../redux/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import firebase, { auth } from "../config/config";

export default function NewQuestion() {
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
    const newPost = {
      userId: currentUser.userId,
      email: currentUser.email,
      realQuestion: postData.realQuestion,
      fakeQuestion: postData.fakeQuestion,
      isRevealed: false,
      comments: [],
      createdAt: firebase.firestore.Timestamp.now().seconds,
      avatar: currentUser.avatar,
    };
    const docRef = await firebase.firestore().collection("posts").add(newPost);
    dispatch(
      addPost({
        ...newPost,
        id: docRef.id,
      })
    );
  };

  return (
    <Card>
      <Form onSubmit={addPostDispatch}>
        <QuestionGroup>
          <TextArea
            placeholder="Write the fake question"
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                fakeQuestion: e.target.value,
              }))
            }
            value={postData.fakeQuestion}
          />
          <QuestionImg src="/static/img/smile.png" alt="fake" />
        </QuestionGroup>
        <QuestionGroup reverse>
          <TextArea
            placeholder="Write the real question"
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                realQuestion: e.target.value,
              }))
            }
            value={postData.realQuestion}
          />
          <QuestionImg src="/static/img/xd.png" alt="fake" />
        </QuestionGroup>
        <Button type="submit" variant="black">
          SEND
        </Button>
      </Form>
    </Card>
  );
}
