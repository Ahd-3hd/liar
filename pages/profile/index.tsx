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
} from "../../styles/Profile.style";
import NewsFeed from "../../components/NewsFeed";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import CaretLeft from "../../utils/svg/CaretLeft.svg";
import CaretRight from "../../utils/svg/CaretRight.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useRef } from "react";
import firebase from "../../config/config";
import { setCurrentUser } from "../../redux/actions/authActions";
import UpdateAvatarIcon from "../../utils/svg/UpdateAvatarIcon.svg";
export default function Profile() {
  const router = useRouter();
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
  const dispatch = useDispatch();

  const fileInputRef: any = useRef();
  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, []);
  const handleFileChange = (e: { target: { files: any[] } }) => {
    const storageRef = firebase.storage().ref();
    const file = e.target.files[0];
    if (file) {
      // Create the file metadata
      var metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
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
  if (!currentUser) return <div>Must Login</div>;
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
