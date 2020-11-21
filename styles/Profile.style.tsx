import styled from "styled-components";

export const Wrapper = styled.div``;
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid ${({ theme: { colors } }) => colors.grey};
  padding: ${({ theme: { spaces } }) => spaces.md};
  border-radius: 1rem;
`;
export const AvatarContainer = styled.div`
  position: relative;
`;
export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 120px;
`;
export const Username = styled.p`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.lg};
  margin: 0;
  margin-top: ${({ theme: { spaces } }) => spaces.md};
  text-transform: uppercase;
`;

export const UpdateAvatarButton = styled.input`
  display: none;
`;

export const VisibleUpdateAvatarButton = styled.button`
  background: ${({ theme: { colors } }) => colors.primary};
  border: none;
  border-radius: 5px;
  padding: ${({ theme: { spaces } }) => spaces.sm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  cursor: pointer;
  svg {
    height: 20px;
    fill: ${({ theme: { colors } }) => colors.white};
  }
`;

export const FriendsWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: ${({ theme: { spaces } }) => spaces.md};
  position: relative;
`;
export const FriendsInnerContainer = styled.div`
  display: flex;
  padding: 0 ${({ theme: { spaces } }) => spaces.lg};
`;
export const FriendContainer = styled.a<{ pos: number }>`
  margin: 0 ${({ theme: { spaces } }) => spaces.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateX(${({ pos }) => `${pos}%`});
  transition: 0.4s;
  text-decoration: none;
`;
export const FriendAvatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 70px;
`;
export const FriendName = styled.p`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.dark};
  margin-bottom: 0;
`;

export const CarouselButton = styled.button<{ flip?: boolean }>`
  background: ${({ theme: { colors } }) => colors.primary + "77"};
  border: none;
  padding: ${({ theme: { spaces } }) => spaces.sm};
  border-radius: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  z-index: 3;
  transform: translateY(-50%);
  height: 100%;
  width: 45px;
  cursor: pointer;
  outline: none;
  transition: background 0.3s;
  ${({ flip }) => (flip ? "right:0;" : "left:0")};
  svg {
    fill: ${({ theme: { colors } }) => colors.white};
    height: 15px;
    padding-bottom: 1px;
  }
  :hover {
    background: ${({ theme: { colors } }) => colors.primary};
  }
`;
