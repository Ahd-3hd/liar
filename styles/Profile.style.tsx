import styled from "styled-components";

export const Wrapper = styled.div``;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const UserAvatar = styled.img`
  max-width: 100px;
`;
export const Username = styled.p`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.text};
`;
export const FriendsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const FriendsContainer = styled.div`
  flex: 1;
  overflow-x: hidden;
  position: relative;
`;
export const FriendsInnerContainer = styled.div`
  display: flex;
`;
export const SlideButton = styled.button<{ direction: string }>`
  position: absolute;
  top: 50%;
  ${({ direction }) =>
    direction === "left" ? "left: 0.5rem;" : "right: 0.5rem"};
  transform: translateY(-50%);
  z-index: 2;
`;
export const FriendLink = styled.a`
  margin: 0 ${({ theme: { spaces } }) => spaces.md};
`;
export const FriendAvatar = styled.img`
  max-width: 60px;
`;
export const FriendsPageLink = styled.a`
  text-align: center;
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.darkblue};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
`;
