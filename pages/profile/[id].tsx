import {
  Wrapper,
  UserInfoContainer,
  UserAvatar,
  Username,
} from "../../styles/Profile.style";
import NewsFeed from "../../components/NewsFeed";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../components/Buttons";
import firebase from "../../config/config";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function FriendProfile() {
  const router = useRouter();
  const [friend, setFriend] = useState({
    avatar: "",
    email: "",
    userId: "",
  });
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const [isFriendExists, setIsFriendExists] = useState(false);
  const fetchFriendData = async (friendId: any) => {
    const friendData = await firebase
      .firestore()
      .collection("users")
      .doc(friendId)
      .get();
    setFriend({
      avatar: friendData.data()?.avatar,
      email: friendData.data()?.email,
      userId: friendData.id,
    });
  };

  useEffect(() => {
    if (router.query.id) {
      fetchFriendData(router.query.id);
    }
  }, [router.query.id]);

  const addFriend = async () => {};

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <Wrapper>
        <UserInfoContainer>
          <UserAvatar src={friend.avatar} alt="avatar" />
          <Username>{friend.email}</Username>
          <Button
            style={{ marginBottom: "1rem" }}
            variant={isFriendExists ? "red" : "black"}
            onClick={addFriend}
          >
            {isFriendExists ? "Remove Friend" : "Add Friend"}
          </Button>
        </UserInfoContainer>
        {/* <FriendsWrapper>
           <FriendsContainer>
            <SlideButton
              direction="left"
              onClick={() => {
                if (slideIndex <= currentUser.friends.length - 5) {
                  setSlidePos((prevState) => prevState - 60);
                  setSlideIndex((prevState) => (prevState += 1));
                  console.log(slideIndex);
                }
              }}
            >
              <CaretLeft />
            </SlideButton>
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
        </FriendsWrapper>*/}

        <NewsFeed
          title={`Posts Wall`}
          page="userPage"
          friendId={router.query.id}
        />
      </Wrapper>
    </>
  );
}
