import styled from "styled-components";
import { Card } from "../components/Card";

export const Wrapper = styled.section``;
export const Title = styled.p`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.text};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};
`;
export const CardsContainer = styled.div``;
export const NewsFeedCard = styled(Card)`
  padding: 0.5rem;
  margin: ${({ theme: { spaces } }) => spaces.lg} 0;
  color: ${({ theme: { colors } }) => colors.text};
`;
export const NewsFeedPosterSection = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
export const AvatarContainer = styled.div`
  margin-right: 1rem;
`;
export const PosterAvatar = styled.img`
  width: 100%;
  max-width: 100px;
`;
export const PostContainer = styled.div`
  width: 100%;
`;
export const NameRevealContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const RevealButton = styled.button<{ isRevealed: boolean }>`
  border: none;
  background: ${({ theme: { colors }, isRevealed }) =>
    isRevealed ? colors.darkred : colors.black};
  color: ${({ theme: { colors } }) => colors.white};
  padding: ${({ theme: { spaces } }) => spaces.sm};
  border-radius: 0.3rem;
  cursor: pointer;
`;
export const PosterName = styled.p`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.normal};
  margin: 0;
`;
export const PosterQuestion = styled.p`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  line-height: 140%;
`;

export const NewsFeedCommentsSection = styled.div``;
export const CommentorAvatarContainer = styled.div`
  margin-right: 1rem;
`;
export const CommentorAvatar = styled.img`
  width: 100%;
  max-width: 60px;
`;
export const CommentorContainer = styled.div`
  flex: 1;
`;
export const CommentorName = styled.p`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.normal};
  margin: 0;
`;
export const Comment = styled.p`
  font-size: 15px;
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.normal};
  line-height: 140%;
  padding: ${({ theme: { spaces } }) => spaces.sm};
  background: ${({ theme: { colors } }) => colors.grey + "55"};
  border-radius: 0.5rem;
  margin: ${({ theme: { spaces } }) => spaces.sm} 0;
`;
export const NoComments = styled.p`
  text-align: center;
  background: ${({ theme: { colors } }) => colors.grey};
  padding: ${({ theme: { spaces } }) => spaces.md} 0;
`;

export const NewCommentContainer = styled.form`
  display: flex;
  align-items: flex-start;
  margin: ${({ theme: { spaces } }) => spaces.sm};
`;

export const TextArea = styled.textarea`
  flex: 9;
  resize: none;
  height: 4em;
  border-radius: 0.3rem;
  border: 1px solid ${({ theme: { colors } }) => colors.grey + "77"};
  padding: ${({ theme: { spaces } }) => spaces.sm};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.text};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};

  :focus {
    outline: none;
    border: 1px solid ${({ theme: { colors } }) => colors.blue + "77"};
    box-shadow: 0px 0px 10px ${({ theme: { colors } }) => colors.blue + "22"};
    transition: 0.3s;
  }
`;
export const UserCommentAvatarContainer = styled.div`
  flex: 1;
  margin-right: ${({ theme: { spaces } }) => spaces.md};
`;
export const UserCommentAvatar = styled.img`
  width: 100%;
`;
export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: ${({ theme: { spaces } }) => spaces.sm};
`;

export const CommentComponent = ({
  commentorName,
  commentText,
}: {
  commentorName: string;
  commentText: string;
}) => {
  return (
    <CommentContainer>
      <CommentorAvatarContainer>
        <CommentorAvatar src="/static/img/avatar.png" alt="avatar" />
      </CommentorAvatarContainer>
      <CommentorContainer>
        <CommentorName>{commentorName}</CommentorName>
        <Comment>{commentText}</Comment>
      </CommentorContainer>
    </CommentContainer>
  );
};
