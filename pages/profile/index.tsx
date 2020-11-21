import NewsFeed from "../../components/NewsFeed";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import CaretLeft from "../../utils/svg/CaretLeft.svg";
import CaretRight from "../../utils/svg/CaretRight.svg";
import { useRef } from "react";
import firebase from "../../config/config";
import UpdateAvatarIcon from "../../utils/svg/UpdateAvatarIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/auth/authSlice";
import { useRouter } from "next/router";
import {
  Wrapper,
  ProfileContainer,
  AvatarContainer,
  Avatar,
  Username,
  UpdateAvatarButton,
  VisibleUpdateAvatarButton,
  FriendsWrapper,
  FriendsInnerContainer,
  FriendContainer,
  FriendAvatar,
  FriendName,
  CarouselButton,
  NoFriends,
  FriendRequestsLink,
  FriendsLinkContainer,
  EditNameButton,
  SaveEditButton,
  NameEditContainer,
  EditInput,
} from "../../styles/Profile.style";

export default function Profile() {
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const [slidePos, setSlidePos] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [friendsData, setFriendsData] = useState<any>([]);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const dispatch = useDispatch();
  const fileInputRef: any = useRef();
  const router = useRouter();
  const handleFileChange = (e: any) => {
    const storageRef = firebase.storage().ref();
    const file = e.target.files[0];
    if (file) {
      // Create the file metadata
      var metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object
      var uploadTask = storageRef
        .child("avatars/" + currentUser.userId + ".jpg")
        .put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
            firebase
              .firestore()
              .collection("users")
              .doc(currentUser.userId)
              .update({
                avatar: downloadURL,
              });
            dispatch(
              setCurrentUser({
                ...currentUser,
                avatar: downloadURL,
              })
            );
          });
        }
      );
    }
  };

  const getFriendsData = async (friendId: string) => {
    const fetchedFriend = await firebase
      .firestore()
      .collection("users")
      .where("userId", "==", friendId)
      .get();
    fetchedFriend.forEach((frnd) => {
      setFriendsData((prevState: any) => {
        return [
          ...prevState,
          {
            userId: frnd.data().userId,
            avatar: frnd.data().avatar,
            email: frnd.data().email,
            username: frnd.data().username,
          },
        ];
      });
    });
  };

  useEffect(() => {
    if (currentUser) {
      currentUser.friends.forEach((frndId: string) => getFriendsData(frndId));
    } else {
      router.push("/login/");
    }
  }, [currentUser]);

  const changeUsername = async () => {
    if (newUsername.length >= 3) {
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.userId)
        .update({
          username: newUsername,
        });
      const userData = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.userId)
        .get();
      dispatch(
        setCurrentUser({
          ...userData.data(),
        })
      );
      setEditUsername(false);
    }
  };

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
        <title>{currentUser.username}</title>
      </Head>
      <Wrapper>
        <ProfileContainer>
          <AvatarContainer>
            <Avatar src={currentUser.avatar} alt="avatar" />
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
          </AvatarContainer>
          <NameEditContainer>
            {editUsername ? (
              <EditInput
                type="text"
                placeholder={currentUser.username}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                }}
              />
            ) : (
              <Username>{currentUser.username}</Username>
            )}
            {editUsername ? (
              <EditNameButton onClick={changeUsername}>save</EditNameButton>
            ) : null}
            <EditNameButton
              onClick={() => setEditUsername((prevState) => !prevState)}
            >
              {editUsername ? "cancel" : "edit"}
            </EditNameButton>
          </NameEditContainer>
        </ProfileContainer>
        {friendsData.length > 0 ? (
          <FriendsLinkContainer>
            <FriendsWrapper>
              <CarouselButton
                onClick={() => {
                  if (slideIndex <= friendsData.length - 5) {
                    setSlidePos((prevState) => prevState - 70);
                    setSlideIndex((prevState) => (prevState += 1));
                  }
                }}
              >
                <CaretLeft />
              </CarouselButton>
              <FriendsInnerContainer>
                {friendsData.map((frnd: any) => (
                  <Link
                    href={`/profile/${frnd.userId}`}
                    passHref
                    key={frnd.userId}
                  >
                    <FriendContainer pos={slidePos}>
                      <FriendAvatar src={frnd.avatar} alt="avatar" />
                      <FriendName>{frnd.username}</FriendName>
                    </FriendContainer>
                  </Link>
                ))}
              </FriendsInnerContainer>
              <CarouselButton
                flip
                onClick={() => {
                  if (slideIndex > 0) {
                    setSlidePos((prevState) => prevState + 70);
                    setSlideIndex((prevState) => (prevState -= 1));
                  }
                }}
              >
                <CaretRight />
              </CarouselButton>
            </FriendsWrapper>
            <Link href="/profile/requests" passHref>
              <FriendRequestsLink>
                View Requests <br /> {currentUser.friendRequestsReceived.length}
              </FriendRequestsLink>
            </Link>
          </FriendsLinkContainer>
        ) : (
          <FriendsLinkContainer
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <NoFriends>You don't have any friends yet</NoFriends>
            <Link href="/profile/requests" passHref>
              <FriendRequestsLink>
                View Requests {currentUser.friendRequestsReceived.length}
              </FriendRequestsLink>
            </Link>
          </FriendsLinkContainer>
        )}
        <NewsFeed title="My Posts" page="currentUser" />
      </Wrapper>
    </>
  );
}
