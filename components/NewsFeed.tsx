import { IPost } from "../interfaces/posts";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  addComment,
  toggleReveal,
} from "../redux/posts/postsSlice";
import firebase from "../config/config";
import { v4 as uuidv4 } from "uuid";

export default function NewsFeed({
  title,
  page,
  friendId,
}: {
  title: string;
  page: string;
  friendId?: any;
}) {
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [activeComment, setActiveComment] = useState<any>(null);
  const dispatch = useDispatch();
  const { posts, isLoading, fetchError } = useSelector(
    (state: any) => state.posts
  );

  useEffect(() => {
    if (page === "homepage") {
      dispatch(fetchPosts());
    } else if (page === "currentUser") {
      dispatch(fetchPosts(currentUser.userId));
    } else if (page === "userPage") {
      dispatch(fetchPosts(friendId));
    }
  }, [currentUser]);

  const handleCommentSubmit = async (
    e: { preventDefault: () => void },
    id: string
  ) => {
    e.preventDefault();
    const newComment = {
      commentText: commentText,
      username: currentUser.email,
      id: uuidv4(),
      avatar: currentUser.avatar,
      postId: id,
      commentorId: currentUser.userId,
    };
    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(newComment),
        commentorsIds: firebase.firestore.FieldValue.arrayUnion(
          currentUser.userId
        ),
      });
    dispatch(addComment(newComment));
    setCommentText("");
  };
  const handleToggleReveal = (postId: string) => {
    dispatch(toggleReveal(postId));
  };
  return <div></div>;
}
