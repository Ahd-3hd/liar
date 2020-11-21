import styled from "styled-components";

export const Wrapper = styled.div``;
export const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme: { colors } }) => colors.white};
  border: 1px solid ${({ theme: { colors } }) => colors.dark + "15"};
  border-radius: 10px;
  padding: ${({ theme: { spaces } }) => spaces.md};
  margin: ${({ theme: { spaces } }) => spaces.lg} 0;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.03);
`;
export const PostSection = styled.div`
  display: flex;
`;
export const PosterAvatarContainer = styled.a`
  flex: 1;
  width: 70px;
  height: 70px;
  border-radius: 70px;
  margin-left: ${({ theme: { spaces } }) => spaces.md};
  cursor: pointer;
`;
export const PosterAvatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 200px;
`;
export const PosterName = styled.a`
  margin: 0;
  justify-self: flex-end;
  color: ${({ theme: { colors } }) => colors.primary};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  text-transform: uppercase;
  text-decoration: none;
`;
export const QuestionSection = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const QuestionText = styled.p<{ status: boolean }>`
  padding: ${({ theme: { spaces } }) => spaces.md};
  background: ${({ theme: { colors }, status }) =>
    status ? colors.primary : colors.dark};
  align-self: stretch;
  text-align: right;
  border-radius: 45px 10px 45px 45px;
  color: ${({ theme: { colors } }) => colors.white};
  margin: ${({ theme: { spaces } }) => spaces.md} 0;
  transition: 0.3s;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const PostButton = styled.button<{ variant: string }>`
  background: transparent;
  border: none;
  padding: ${({ theme: { spaces } }) => spaces.sm};
  width: ${({ theme: { spaces } }) => spaces.xl};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme: { spaces } }) => spaces.md};
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
  border: 1px solid
    ${({ theme: { colors }, variant }) =>
      variant === "danger" ? colors.danger + "99" : colors.primary + "99"};
  transition: border 0.3s;
  svg {
    height: 18px;
    fill: ${({ theme: { colors }, variant }) =>
      variant === "danger" ? colors.danger + "99" : colors.primary + "99"};
    transition: fill 0.4s;
  }
  :hover {
    border: 1px solid
      ${({ theme: { colors }, variant }) =>
        variant === "danger" ? colors.danger : colors.primary};
    svg {
      fill: ${({ theme: { colors }, variant }) =>
        variant === "danger" ? colors.danger : colors.primary};
    }
  }
`;
export const NameButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
`;
export const DividerSpan = styled.p`
  margin-right: ${({ theme: { spaces } }) => spaces.sm};
  color: ${({ theme: { colors } }) => colors.dark + "80"};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
`;
export const DividerLine = styled.div`
  flex: 1;
  height: 0;
  border: 1px solid ${({ theme: { colors } }) => colors.dark + "20"};
  border-radius: 5px;
`;

export const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: ${({ theme: { spaces } }) => spaces.sm} 0;
  padding-bottom: ${({ theme: { spaces } }) => spaces.md};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.dark + 10};
`;
export const CommentAvatarContainer = styled.a`
  flex: 1;
  width: 100%;
  height: 100%;
  max-width: 60px;
  max-height: 60px;
  border-radius: 60px;
  overflow: hidden;
  margin-right: ${({ theme: { spaces } }) => spaces.md};
`;
export const NameCommentContainer = styled.div`
  flex: 7;
`;

export const CommentAvatar = styled.img`
  width: 100%;
  height: 100%;
  max-width: 60px;
  max-height: 60px;
  border-radius: 60px;
`;
export const CommentorName = styled.a`
  margin: 0;
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.dark};
`;
export const CommentText = styled.p`
  margin: 0;
  margin-top: ${({ theme: { spaces } }) => spaces.md};
  background: ${({ theme: { colors } }) => colors.grey};
  padding: ${({ theme: { spaces } }) => spaces.md};
  border-radius: 3px 15px 15px 15px;
`;

export const NewCommentContainer = styled.form`
  display: flex;
`;
export const NewCommentAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin-right: ${({ theme: { spaces } }) => spaces.md};
`;
export const NewCommentInputContainer = styled.div`
  flex: 1;
  display: flex;
`;
export const NewCommentInput = styled.input`
  flex: 4;
  margin-right: ${({ theme: { spaces } }) => spaces.sm};
  border-radius: 10px;
  border: 1px solid ${({ theme: { colors } }) => colors.dark + "15"};
  outline: none;
  transition: all 0.5s;
  background: ${({ theme: { colors } }) => colors.grey};
  font-family: inherit;
  padding-left: ${({ theme: { spaces } }) => spaces.md};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.dark};

  ::placeholder {
    font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
    color: ${({ theme: { colors } }) => colors.dark + "70"};
  }
  :focus {
    box-shadow: 0 0 2px ${({ theme: { colors } }) => colors.primary};
    border-color: ${({ theme: { colors } }) => colors.primary + "15"};
  }
`;
export const NewCommentButton = styled.button`
  cursor: pointer;
  border-radius: 10px;
  flex: 0.5;
  background: ${({ theme: { colors } }) => colors.primary};
  border: none;
  padding: ${({ theme: { spaces } }) => spaces.sm};
  svg {
    height: 15px;
    fill: ${({ theme: { colors } }) => colors.white};
  }
`;

export const LoginToComment = styled.a`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.primary};
  text-align: center;
  margin: ${({ theme: { spaces } }) => spaces.md} 0;
  text-decoration: none;
`;

export const MustCommentToReveal = styled.p`
  color: ${({ theme: { colors } }) => colors.dark};
  margin-right: ${({ theme: { spaces } }) => spaces.md};
  text-align: center;
  padding: ${({ theme: { spaces } }) => spaces.md};
  background: ${({ theme: { colors } }) => colors.grey};
  border-radius: 10px;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
`;

export const FirstComment = styled.p`
  text-align: center;
  margin: ${({ theme: { spaces } }) => spaces.md};
  color: ${({ theme: { colors } }) => colors.dark};
`;
