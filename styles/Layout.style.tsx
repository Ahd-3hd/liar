import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 0;
  padding-bottom: 0;
  display: flex;
`;

export const Container = styled.div`
  border: 2px solid ${({ theme: { colors } }) => colors.grey + "55"};
  border-radius: 0.5rem;
  width: 100%;
  padding: ${({ theme: { spaces } }) => spaces.md};
  padding-bottom: 0;
`;
