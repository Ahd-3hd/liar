import styled from "styled-components";
import { Card } from "../components/Card";

export const Container = styled(Card)`
  padding: ${({ theme: { spaces } }) => spaces.md};
`;
export const Title = styled.h1`
  color: ${({ theme: { colors } }) => colors.text};
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme: { spaces } }) => spaces.md} 0;
`;
export const InputField = styled.input`
  border-radius: 0.3rem;
  border: 1px solid ${({ theme: { colors } }) => colors.grey + "77"};
  padding: ${({ theme: { spaces } }) => spaces.sm};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.text};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};

  :focus {
    outline: none;
    border: 1px solid ${({ theme: { colors } }) => colors.blue + "77"};
    box-shadow: 0px 0px 10px ${({ theme: { colors } }) => colors.blue + "22"};
    transition: 0.3s;
  }
`;
export const InputLabel = styled.label`
  font-size: 0.75rem;
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.darkblue};
`;
export const CreateAccountLink = styled.a`
  display: block;
  margin: ${({ theme: { spaces } }) => spaces.lg} 0;
  margin-bottom: 0;
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.darkblue};
  text-decoration: none;
  text-align: center;
`;
