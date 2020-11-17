import {
  Wrapper,
  UserInfoContainer,
  UserAvatar,
  Username,
  FriendsWrapper,
  FriendsContainer,
  FriendLink,
  FriendAvatar,
  FriendsPageLink,
  FriendsInnerContainer,
  SlideButton,
  UserAvatarContainer,
  UpdateAvatarButton,
  VisibleUpdateAvatarButton,
  NoFriendsParagraph,
} from "../../styles/Profile.style";
import NewsFeed from "../../components/NewsFeed";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import CaretLeft from "../../utils/svg/CaretLeft.svg";
import CaretRight from "../../utils/svg/CaretRight.svg";
import { useRef } from "react";
import firebase from "../../config/config";
import UpdateAvatarIcon from "../../utils/svg/UpdateAvatarIcon.svg";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const [slidePos, setSlidePos] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const fileInputRef: any = useRef();

  const handleFileChange = (e: { target: { files: any[] } }) => {};

  if (isUserLoading) {
    return <div>Loading</div>;
  } else if (isUserFetchError) {
    return <div>error</div>;
  }

  if (!isUserLoading && !currentUser) {
    return <div>IsLoading</div>;
  }

  return (
    <>
      <Head>
        <title>{currentUser.email}</title>
      </Head>
      <Wrapper>
        <UserInfoContainer>
          <UserAvatarContainer>
            <UserAvatar src={currentUser.avatar} alt="avatar" />
            <UpdateAvatarButton
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".jpg"
            />
            <VisibleUpdateAvatarButton
              onClick={() => fileInputRef?.current?.click()}
            >
              <UpdateAvatarIcon />
            </VisibleUpdateAvatarButton>
          </UserAvatarContainer>
          <Username>{currentUser.email}</Username>
        </UserInfoContainer>
        <FriendsWrapper>
          <FriendsContainer>
            {currentUser.friends.length > 0 && (
              <SlideButton
                direction="left"
                onClick={() => {
                  if (slideIndex <= currentUser.friends.length - 5) {
                    setSlidePos((prevState) => prevState - 60);
                    setSlideIndex((prevState) => (prevState += 1));
                  }
                }}
              >
                <CaretLeft />
              </SlideButton>
            )}
            {currentUser.friends.length === 0 ? (
              <NoFriendsParagraph>You have no friends yet</NoFriendsParagraph>
            ) : (
              <FriendsInnerContainer slidePos={slidePos}>
                {currentUser.friends.map((friend: any) => (
                  <Link
                    href={`/profile/${friend.userid}`}
                    passHref
                    key={friend.userid}
                  >
                    <FriendLink>
                      <FriendAvatar src={friend.avatar} alt="avatar" />
                    </FriendLink>
                  </Link>
                ))}
              </FriendsInnerContainer>
            )}
            {currentUser.friends.length > 0 && (
              <SlideButton
                direction="right"
                onClick={() => {
                  if (slideIndex > 0) {
                    setSlidePos((prevState) => prevState + 60);
                    setSlideIndex((prevState) => (prevState -= 1));
                  }
                }}
              >
                <CaretRight />
              </SlideButton>
            )}
          </FriendsContainer>
          {/* <Link href="profile/friends" passHref>
            <FriendsPageLink>
              Friends
              <br />
              Page
            </FriendsPageLink>
          </Link> */}
        </FriendsWrapper>

        <NewsFeed title="My wall" page="currentUser" />
      </Wrapper>
    </>
  );
}
