import {
  Form,
  QuestionGroup,
  TextArea,
  QuestionImg,
} from "../styles/NewQuestion.style";
import { Card } from "./Card";
import { Button } from "./Buttons";
export default function NewQuestion() {
  return (
    <Card>
      <Form>
        <QuestionGroup>
          <TextArea placeholder="Write the fake question" />
          <QuestionImg src="/static/img/smile.png" alt="fake" />
        </QuestionGroup>
        <QuestionGroup reverse>
          <TextArea placeholder="Write the real question" />
          <QuestionImg src="/static/img/xd.png" alt="fake" />
        </QuestionGroup>
        <Button>SEND</Button>
      </Form>
    </Card>
  );
}
