import styled from "styled-components";

export const Wrapper = styled.section``;
export const Title = styled.p`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.text};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};
`;
