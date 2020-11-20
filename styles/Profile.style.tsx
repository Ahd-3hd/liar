import styled from "styled-components";

export const Wrapper = styled.div``;
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const AvatarContainer = styled.div`
  position: relative;
`;
export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
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
