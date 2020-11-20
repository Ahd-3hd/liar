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
import {
  Wrapper,
  PostCard,
  PostSection,
  PosterAvatar,
  PosterName,
  QuestionSection,
  QuestionText,
  ButtonsContainer,
  PostButton,
  NameButtonsContainer,
  PosterAvatarContainer,
  Divider,
  DividerSpan,
  DividerLine,
  CommentsSection,
  CommentContainer,
  CommentAvatarContainer,
  CommentAvatar,
  CommentorName,
  CommentText,
  NameCommentContainer,
} from "../styles/NewsFeed.style";
import RemoveIcon from "../utils/svg/RemoveIcon.svg";
import HideIcon from "../utils/svg/HideIcon.svg";

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
  return (
    <Wrapper>
      {posts.map((post: IPost) => (
        <PostCard key={post.id}>
          <PostSection>
            <QuestionSection>
              <NameButtonsContainer>
                <ButtonsContainer>
                  <PostButton variant="primary">
                    <HideIcon />
                  </PostButton>
                  <PostButton variant="danger">
                    <RemoveIcon />
                  </PostButton>
                </ButtonsContainer>
                <PosterName>{post.email.split("@")[0]}</PosterName>
              </NameButtonsContainer>
              <QuestionText status={post.isRevealed}>
                {post.fakeQuestion}
              </QuestionText>
            </QuestionSection>
            <PosterAvatarContainer>
              <PosterAvatar src={post.avatar} alt="avatar" />
            </PosterAvatarContainer>
          </PostSection>
          <Divider>
            <DividerSpan>COMMENTS</DividerSpan>
            <DividerLine />
          </Divider>
          <CommentsSection>
            {post.comments.map((comment: any) => (
              <CommentContainer key={comment.id}>
                <CommentAvatarContainer>
                  <CommentAvatar src={comment.avatar} alt="avatar" />
                </CommentAvatarContainer>
                <NameCommentContainer>
                  <CommentorName>
                    {comment.username.split("@")[0]}
                  </CommentorName>
                  <CommentText>{comment.commentText}</CommentText>
                </NameCommentContainer>
              </CommentContainer>
            ))}
          </CommentsSection>
        </PostCard>
      ))}
    </Wrapper>
  );
}
