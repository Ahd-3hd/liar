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
} from "../../styles/Profile.style";
import NewsFeed from "../../components/NewsFeed";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CaretLeft from "../../utils/svg/CaretLeft.svg";
import CaretRight from "../../utils/svg/CaretRight.svg";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const currentUser = useSelector(
    ({ auth }: { auth: any }) => auth.currentUser
  );
  const [slidePos, setSlidePos] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [friendList] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
  ]);
  console.log(currentUser);
  if (!currentUser) return <div>Must Log in</div>;
  return (
    <>
      <Head>
        <title>{currentUser.email}</title>
      </Head>
      <Wrapper>
        <UserInfoContainer>
          <UserAvatar src={currentUser.avatar} alt="avatar" />
          <Username>{currentUser.email}</Username>
        </UserInfoContainer>
        <FriendsWrapper>
          <FriendsContainer>
            <SlideButton
              direction="left"
              onClick={() => {
                if (slideIndex <= friendList.length - 5) {
                  setSlidePos((prevState) => prevState - 60);
                  setSlideIndex((prevState) => (prevState += 1));
                  console.log(slideIndex);
                }
              }}
            >
              <CaretLeft />
            </SlideButton>
            <FriendsInnerContainer slidePos={slidePos}>
              {friendList.map((friend) => (
                <Link href={`/profile/${friend}`} passHref key={friend}>
                  <FriendLink>
                    <FriendAvatar src="/static/img/avatar.png" alt="avatar" />
                  </FriendLink>
                </Link>
              ))}
            </FriendsInnerContainer>
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
          </FriendsContainer>
          <Link href="profile/friends" passHref>
            <FriendsPageLink>
              Friends
              <br />
              Page
            </FriendsPageLink>
          </Link>
        </FriendsWrapper>

        <NewsFeed title="My wall" page="currentUser" />
      </Wrapper>
    </>
  );
}
