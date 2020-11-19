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
import { useSelector, useDispatch } from "react-redux";
import {
  sendFriendRequest,
  acceptFriendRequest,
} from "../../redux/auth/authSlice";

export default function FriendProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
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

  const addFriend = async () => {
    if (router.query.id) {
      await firebase
        .firestore()
        .collection("users")
        .doc(router.query.id as string)
        .update({
          friendRequestsReceived: firebase.firestore.FieldValue.arrayUnion(
            currentUser.userId
          ),
        });
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.userId)
        .update({
          friendRequestsSent: firebase.firestore.FieldValue.arrayUnion(
            router.query.id as string
          ),
        });
      dispatch(sendFriendRequest(router.query.id as string));
    }
  };

  const acceptFriend = async () => {
    if (router.query.id) {
      await firebase
        .firestore()
        .collection("users")
        .doc(router.query.id as string)
        .update({
          friendRequestsSent: firebase.firestore.FieldValue.arrayRemove(
            currentUser.userId
          ),
          friends: firebase.firestore.FieldValue.arrayUnion(currentUser.userId),
        });
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.userId)
        .update({
          friendRequestsReceived: firebase.firestore.FieldValue.arrayRemove(
            router.query.id
          ),
          friends: firebase.firestore.FieldValue.arrayUnion(router.query.id),
        });
      dispatch(acceptFriendRequest(router.query.id as string));
    }
  };

  const renderFriendButton = () => {
    if (!currentUser || !router.query.id) return;
    if (currentUser.friendRequestsSent.includes(router.query.id)) {
      return (
        <Button
          style={{ marginBottom: "1rem" }}
          variant="red"
          onClick={addFriend}
        >
          Remove Add
        </Button>
      );
    } else if (currentUser.friendRequestsReceived.includes(router.query.id)) {
      return (
        <Button
          style={{ marginBottom: "1rem" }}
          variant="black"
          onClick={acceptFriend}
        >
          Accept Friend
        </Button>
      );
    } else if (currentUser.friends.includes(router.query.id)) {
      return (
        <Button
          style={{ marginBottom: "1rem" }}
          variant="red"
          onClick={addFriend}
        >
          Remove Friend
        </Button>
      );
    } else {
      return (
        <Button
          style={{ marginBottom: "1rem" }}
          variant="black"
          onClick={addFriend}
        >
          Add Friend
        </Button>
      );
    }
  };

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <Wrapper>
        <UserInfoContainer>
          <UserAvatar src={friend.avatar} alt="avatar" />
          <Username>{friend.email}</Username>
          {renderFriendButton()}
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
