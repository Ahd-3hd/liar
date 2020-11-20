import { useState } from "react";
import { addPost } from "../redux/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import firebase, { auth } from "../config/config";
import { useRouter } from "next/router";

export default function NewQuestion() {
  const router = useRouter();
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    realQuestion: "",
    fakeQuestion: "",
  });

  const addPostDispatch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!currentUser) return router.push("/login/");
    const newPost = {
      userId: currentUser.userId,
      email: currentUser.email,
      realQuestion: postData.realQuestion,
      fakeQuestion: postData.fakeQuestion,
      isRevealed: false,
      comments: [],
      createdAt: firebase.firestore.Timestamp.now().seconds,
      avatar: currentUser.avatar,
      commentorsIds: [],
    };
    const docRef = await firebase.firestore().collection("posts").add(newPost);
    dispatch(
      addPost({
        ...newPost,
        id: docRef.id,
      })
    );
    setPostData({
      realQuestion: "",
      fakeQuestion: "",
    });
  };

  return <div></div>;
}
