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
export const PostContainer = styled.div``;
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

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: ${({ theme: { spaces } }) => spaces.sm};
`;

export const NoComments = styled.p`
  text-align: center;
  padding: ${({ theme: { spaces } }) => `${spaces.md} ${spaces.sm}`};
  background: ${({ theme: { colors } }) => colors.grey};
  border-radius: 0.4rem;
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
