import Head from "next/head";
import { useEffect, useState } from "react";
import RemoveIcon from "../../utils/svg/RemoveIcon.svg";
import NewQuestion from "../../utils/svg/NewQuestion.svg";
import AddFriendIcon from "../../utils/svg/AddFriendIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../config/config";
import { useRouter } from "next/router";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../redux/auth/authSlice";

export default function Requests() {
  const dispatch = useDispatch();

  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const [friendsData, setFriendsData] = useState<any>([]);

  const getFriendsData = async (friendId: string) => {
    const fetchedFriend = await firebase
      .firestore()
      .collection("users")
      .where("userId", "==", friendId)
      .get();
    fetchedFriend.forEach((frnd) => {
      setFriendsData((prevState: any) => [
        ...prevState,
        {
          userId: frnd.data().userId,
          avatar: frnd.data().avatar,
          email: frnd.data().email,
        },
      ]);
    });
  };

  useEffect(() => {
    if (currentUser) {
      currentUser.friendRequestsReceived.forEach((frndId: string) =>
        getFriendsData(frndId)
      );
    }
  }, [currentUser]);

  const acceptFriend = async (id: string) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(id)
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
        friendRequestsReceived: firebase.firestore.FieldValue.arrayRemove(id),
        friends: firebase.firestore.FieldValue.arrayUnion(id),
      });
    dispatch(acceptFriendRequest(id));
    setFriendsData((prevState: any) => {
      const removeRequest = prevState.filter((frnd: any) => frnd.userId !== id);
      return removeRequest;
    });
  };

  const rejectFriend = async (id: string) => {
    console.log(id);
    await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        friendRequestsSent: firebase.firestore.FieldValue.arrayRemove(
          currentUser.userId
        ),
      });
    await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.userId)
      .update({
        friendRequestsReceived: firebase.firestore.FieldValue.arrayRemove(id),
      });
    setFriendsData((prevState: any) => {
      const removeRequest = prevState.filter((frnd: any) => frnd.userId !== id);
      return removeRequest;
    });
  };

  return <></>;
}
