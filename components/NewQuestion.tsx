import {
  Form,
  QuestionGroup,
  TextArea,
  QuestionImg,
} from "../styles/NewQuestion.style";
import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Buttons";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/actions/postsActions";
import { useSelector } from "react-redux";

export default function NewQuestion() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    ({ auth }: { auth: any }) => auth.currentUser
  );
  const [postData, setPostData] = useState({
    realQuestion: "",
    fakeQuestion: "",
  });

  const addPostDispatch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      addPost({
        ...postData,
        userid: currentUser.userId,
        email: currentUser.email,
        avatar: currentUser.avatar,
      })
    );
    setPostData({
      realQuestion: "",
      fakeQuestion: "",
    });
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
        <Button type="submit">SEND</Button>
      </Form>
    </Card>
  );
}
