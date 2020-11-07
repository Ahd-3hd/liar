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
export const FriendsInnerContainer = styled.div<{ slidePos: number }>`
  display: flex;
  transform: translateX(${({ slidePos }) => slidePos}px);
  transition: transform 0.4s ease-in;
`;
export const SlideButton = styled.button<{ direction: string }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === "left" ? "left: 0rem;" : "right: 0rem")};
  transform: translateY(-50%);
  z-index: 2;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  opacity: 0.2;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    width: 20px;
  }
  :hover,
  :active {
    opacity: 0.8;
    cursor: pointer;
  }
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
