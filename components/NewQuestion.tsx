import {
  Form,
  QuestionGroup,
  TextArea,
  QuestionImg,
} from "../styles/NewQuestion.style";
import { Card } from "./Card";
import { Button } from "./Buttons";
import { useContext, useState } from "react";
import postsContext from "../context/postsContext";

export default function NewQuestion() {
  const context = useContext(postsContext);
  const [newPost, setNewPost] = useState({
    userId: "ahd",
    postId: 0,
    realQuestion: "",
    fakeQuestion: "",
    comments: [],
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    context.addPost(newPost);
    console.log(context);
  };
  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <QuestionGroup>
          <TextArea
            placeholder="Write the fake question"
            onChange={(e) => {
              setNewPost((prevState) => ({
                ...prevState,
                fakeQuestion: e.target.value,
              }));
            }}
          />
          <QuestionImg src="/static/img/smile.png" alt="fake" />
        </QuestionGroup>
        <QuestionGroup reverse>
          <TextArea
            placeholder="Write the real question"
            onChange={(e) => {
              setNewPost((prevState) => ({
                ...prevState,
                realQuestion: e.target.value,
              }));
            }}
          />
          <QuestionImg src="/static/img/xd.png" alt="fake" />
        </QuestionGroup>
        <Button>SEND</Button>
      </Form>
    </Card>
  );
}
