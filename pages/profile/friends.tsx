import Head from "next/head";
import { useState, useContext } from "react";
import {
  Wrapper,
  TitleContainer,
  Title,
  ViewRequestsLink,
  FriendCard,
  FriendCardsContainer,
  FriendAvatarContainer,
  FriendAvatar,
  FriendDetails,
  FriendName,
  FriendButtons,
  FriendButton,
} from "../../styles/Friends.style";
import RemoveIcon from "../../utils/svg/RemoveIcon.svg";
import NewQuestion from "../../utils/svg/NewQuestion.svg";
import AddFriendIcon from "../../utils/svg/AddFriendIcon.svg";
import postsContext from "../../context/postsContext";

export default function Friends() {
  const context = useContext(postsContext);
  const [isRequest, setIsRequest] = useState(false);
  console.log(context);
  return (
    <>
      <Head>
        <title>{isRequest ? "Friend Requests" : "Friends"}</title>
      </Head>
      <Wrapper>
        <TitleContainer>
          <Title>{isRequest ? "Requests" : "My Friends - 17"}</Title>
          {isRequest ? (
            <ViewRequestsLink
              onClick={() => setIsRequest((prevState) => !prevState)}
            >
              Back
            </ViewRequestsLink>
          ) : (
            <ViewRequestsLink
              onClick={() => setIsRequest((prevState) => !prevState)}
            >
              View Requests
            </ViewRequestsLink>
          )}
        </TitleContainer>
        {isRequest ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((friend) => (
              <FriendCardsContainer key={friend}>
                <FriendCard>
                  <FriendAvatarContainer>
                    <FriendAvatar src="/static/img/avatar.png" alt="avatar" />
                  </FriendAvatarContainer>
                  <FriendDetails>
                    <FriendName>John Doe</FriendName>
                    <FriendButtons>
                      <FriendButton danger>
                        <RemoveIcon />
                      </FriendButton>
                      <FriendButton>
                        <AddFriendIcon />
                      </FriendButton>
                    </FriendButtons>
                  </FriendDetails>
                </FriendCard>
              </FriendCardsContainer>
            ))}
          </>
        ) : (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((friend) => (
              <FriendCardsContainer key={friend}>
                <FriendCard>
                  <FriendAvatarContainer>
                    <FriendAvatar src="/static/img/avatar.png" alt="avatar" />
                  </FriendAvatarContainer>
                  <FriendDetails>
                    <FriendName>John Doe</FriendName>
                    <FriendButtons>
                      <FriendButton danger>
                        <RemoveIcon />
                      </FriendButton>
                      <FriendButton>
                        <NewQuestion />
                      </FriendButton>
                    </FriendButtons>
                  </FriendDetails>
                </FriendCard>
              </FriendCardsContainer>
            ))}
          </>
        )}
      </Wrapper>
    </>
  );
}
