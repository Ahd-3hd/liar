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
  display: flex;
  overflow-x: hidden;
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
