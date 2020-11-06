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
  color: ${({ theme: { colors } }) => colors.text};
`;
export const NewsFeedPosterSection = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const NewsFeedCommentsSection = styled.div``;
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
`;
export const PosterQuestion = styled.p`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  line-height: 140%;
`;
