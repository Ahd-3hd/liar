import styled from "styled-components";
import { Card } from "../components/Card";
import { Button } from "../components/Buttons";
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
export const ViewRequestsLink = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  font-size: inherit;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme: { colors } }) => colors.darkblue};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
`;

export const FriendCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FriendCard = styled(Card)`
  display: flex;
  margin: ${({ theme: { spaces } }) => spaces.md} 0;
`;
export const FriendAvatarContainer = styled.div`
  margin-right: ${({ theme: { spaces } }) => spaces.md};
  padding: ${({ theme: { spaces } }) => spaces.sm};
`;
export const FriendAvatar = styled.img`
  max-width: 100px;
`;
export const FriendDetails = styled.div`
  flex: 1;
  padding: 0 ${({ theme: { spaces } }) => spaces.md};
`;
export const FriendName = styled.p`
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.text};
`;
export const FriendButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const FriendButton = styled(Button)<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${({ theme: { colors } }) => colors.white};
    width: 24px;
  }
  padding: 8px 16px;
  background: ${({ theme: { colors }, danger }) =>
    danger ? colors.darkred : colors.black};
`;
