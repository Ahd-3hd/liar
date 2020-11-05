import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme: { colors } }) => colors.white};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;
