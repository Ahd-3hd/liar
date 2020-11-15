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
import { useRouter } from "next/router";
import firebase from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/authActions";

export default function FriendProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    ({ auth }: { auth: any }) => auth.currentUser
  );
  const [friend, setFriend] = useState({
    avatar: "",
    email: "",
    userId: "",
  });

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

  const addFriend = async () => {
    const isFriendExists = currentUser.friends.filter(
      (frnd: any) => frnd.userid === friend.userId
    );
    if (isFriendExists.length > 0) {
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.userId)
        .update({
          friends: firebase.firestore.FieldValue.arrayRemove({
            avatar: friend.avatar,
            email: friend.email,
            userid: friend.userId,
          }),
        });
      const friendsArray = currentUser.friends;
      const friendsArrayAfterRemove = friendsArray.filter(
        (frnd: any) => frnd === friend.userId
      );
      console.log(friendsArrayAfterRemove);
      dispatch(
        setCurrentUser({
          ...currentUser,
          friends: friendsArrayAfterRemove,
        })
      );
    } else {
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.userId)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion({
            avatar: friend.avatar,
            email: friend.email,
            userid: friend.userId,
          }),
        });
      const friendsArray = currentUser.friends;
      friendsArray.push({
        userid: friend.userId,
        avatar: friend.avatar,
        email: friend.email,
      });
      dispatch(
        setCurrentUser({
          ...currentUser,
          friends: friendsArray,
        })
      );
    }
  };

  useEffect(() => {
    const friendId: any = router.query.id!;
    if (friendId) {
      fetchFriendData(friendId);
    }
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <Wrapper>
        <UserInfoContainer>
          <UserAvatar src={friend.avatar} alt="avatar" />
          <Username>{friend.email}</Username>
          <Button style={{ marginBottom: "1rem" }} onClick={addFriend}>
            Add Friend
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
