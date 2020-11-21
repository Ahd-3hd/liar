import styled from "styled-components";

export const Wrapper = styled.div``;

export const Title = styled.h1`
  color: ${({ theme: { colors } }) => colors.primary};
`;

export const Container = styled.div``;
export const RequestContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme: { spaces } }) => spaces.md};
  padding: ${({ theme: { spaces } }) => spaces.sm + " " + spaces.md};
  border: 1px solid ${({ theme: { colors } }) => colors.grey};
  border-radius: 5px;
`;
export const FriendAvatarContainer = styled.a``;
export const FriendAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
`;
export const RequestText = styled.p`
  color: ${({ theme: { colors } }) => colors.dark};
`;
export const FriendName = styled.a`
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.primary};
  margin-right: ${({ theme: { spaces } }) => spaces.sm};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
`;
export const RequestButton = styled.button<{ variant: string }>`
  background: ${({ theme: { colors }, variant }) => {
    //@ts-ignore
    return colors[variant];
  }};
  padding: ${({ theme: { spaces } }) => spaces.sm + " " + spaces.md};
  border: none;
  border-radius: 5px;
  margin: 0 ${({ theme: { spaces } }) => spaces.sm};
  cursor: pointer;
  svg {
    fill: ${({ theme: { colors } }) => colors.white};
    height: 16px;
  }
`;
