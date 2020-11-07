import styled from "styled-components";
import { fontWeights } from "../utils/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.p`
  margin: 0;
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.lg};
  color: ${({ theme: { colors } }) => colors.text};
`;
export const ViewRequestsLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme: { colors } }) => colors.darkblue};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
`;
