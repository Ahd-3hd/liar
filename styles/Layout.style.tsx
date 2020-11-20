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
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.03);
  padding: ${({ theme: { spaces } }) => spaces.md};
`;
