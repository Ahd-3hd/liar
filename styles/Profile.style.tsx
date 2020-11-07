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
