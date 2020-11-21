import NewsFeed from "../../components/NewsFeed";
import Head from "next/head";
import { useEffect, useState } from "react";
import firebase from "../../config/config";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  sendFriendRequest,
  acceptFriendRequest,
  removeFriendRequest,
  removeFriend,
} from "../../redux/auth/authSlice";
import {
  Wrapper,
  ProfileContainer,
  AvatarContainer,
  Avatar,
  Username,
  AddRemoveUndoButton,
} from "../../styles/Profile.style";

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

  const undoFriendRequest = async () => {
    if (router.query.id) {
      await firebase
        .firestore()
        .collection("users")
        .doc(router.query.id as string)
        .update({
          friendRequestsReceived: firebase.firestore.FieldValue.arrayRemove(
            currentUser.userId
          ),
        });
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.userId)
        .update({
          friendRequestsSent: firebase.firestore.FieldValue.arrayRemove(
            router.query.id
          ),
        });
      dispatch(removeFriendRequest(router.query.id as string));
    }
  };

  const unfriend = async () => {
    if (router.query.id) {
      await firebase
        .firestore()
        .collection("users")
        .doc(router.query.id as string)
        .update({
          friends: firebase.firestore.FieldValue.arrayRemove(
            currentUser.userId
          ),
        });
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.userId)
        .update({
          friends: firebase.firestore.FieldValue.arrayRemove(router.query.id),
        });

      dispatch(removeFriend(router.query.id as string));
    }
  };

  const renderFriendButton = () => {
    if (!currentUser || !router.query.id) return;
    //remove add
    if (currentUser.friendRequestsSent.includes(router.query.id)) {
      return (
        <AddRemoveUndoButton variant="danger" onClick={undoFriendRequest}>
          Undo Request
        </AddRemoveUndoButton>
      );
    } else if (currentUser.friendRequestsReceived.includes(router.query.id)) {
      // accept friend
      return (
        <AddRemoveUndoButton variant="primary" onClick={acceptFriend}>
          Accept
        </AddRemoveUndoButton>
      );
    } else if (currentUser.friends.includes(router.query.id)) {
      // remove friend
      return (
        <AddRemoveUndoButton variant="danger" onClick={unfriend}>
          Unfriend
        </AddRemoveUndoButton>
      );
    } else {
      // add friend
      return (
        <AddRemoveUndoButton variant="primary" onClick={addFriend}>
          Add
        </AddRemoveUndoButton>
      );
    }
  };

  return (
    <>
      <Head>
        <title>{friend.email.split("@")[0]}</title>
      </Head>
      <Wrapper>
        <ProfileContainer>
          <AvatarContainer>
            <Avatar src={friend.avatar} alt="avatar" />
          </AvatarContainer>
          <Username>{friend.email.split("@")[0]}</Username>
          {renderFriendButton()}
        </ProfileContainer>
        <NewsFeed title="My Posts" page="userPage" />
      </Wrapper>
    </>
  );
}
