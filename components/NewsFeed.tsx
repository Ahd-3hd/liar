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
  NewCommentContainer,
  NewCommentAvatar,
  NewCommentInputContainer,
  NewCommentInput,
  NewCommentButton,
  LoginToComment,
  MustCommentToReveal,
  FirstComment,
  NoPosts,
} from "../styles/NewsFeed.style";
import RemoveIcon from "../utils/svg/RemoveIcon.svg";
import HideIcon from "../utils/svg/HideIcon.svg";
import RevealIcon from "../utils/svg/RevealIcon.svg";
import SendButton from "../utils/svg/SendIcon.svg";

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
    if (commentText.length <= 0) return;
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

  if (posts.length === 0) {
    return (
      <Wrapper>
        <NoPosts>There's no Posts yet ...</NoPosts>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {posts.map((post: IPost) => (
        <PostCard key={post.id}>
          <PostSection>
            <QuestionSection>
              <NameButtonsContainer>
                <ButtonsContainer>
                  {post.commentorsIds.includes(currentUser?.userId) ||
                  currentUser?.userId === post.userId ? (
                    <PostButton
                      variant="primary"
                      onClick={() => handleToggleReveal(post.id)}
                    >
                      {post.isRevealed ? <HideIcon /> : <RevealIcon />}
                    </PostButton>
                  ) : (
                    <MustCommentToReveal>
                      Comment to
                      <br />
                      reveal
                    </MustCommentToReveal>
                  )}

                  {currentUser?.userId === post?.userId && (
                    <PostButton variant="danger">
                      <RemoveIcon />
                    </PostButton>
                  )}
                </ButtonsContainer>
                <Link
                  href={`/profile/${
                    post.userId !== currentUser?.userId ? post.userId : ""
                  }`}
                  passHref
                >
                  <PosterName>{post.email.split("@")[0]}</PosterName>
                </Link>
              </NameButtonsContainer>
              <QuestionText status={post.isRevealed}>
                {post.isRevealed ? post.realQuestion : post.fakeQuestion}
              </QuestionText>
            </QuestionSection>
            <Link
              href={`/profile/${
                post.userId !== currentUser?.userId ? post.userId : ""
              }`}
              passHref
            >
              <PosterAvatarContainer>
                <PosterAvatar src={post.avatar} alt="avatar" />
              </PosterAvatarContainer>
            </Link>
          </PostSection>
          <Divider>
            <DividerSpan>COMMENTS</DividerSpan>
            <DividerLine />
          </Divider>
          <CommentsSection>
            {post.comments.length > 0 ? (
              post.comments.map((comment: any) => (
                <CommentContainer key={comment.id}>
                  <Link
                    href={`/profile/${
                      comment.commentorId !== currentUser?.userId
                        ? comment.commentorId
                        : ""
                    }`}
                    passHref
                  >
                    <CommentAvatarContainer>
                      <CommentAvatar src={comment.avatar} alt="avatar" />
                    </CommentAvatarContainer>
                  </Link>
                  <NameCommentContainer>
                    <Link
                      href={`/profile/${
                        comment.commentorId !== currentUser?.userId
                          ? comment.commentorId
                          : ""
                      }`}
                      passHref
                    >
                      <CommentorName>
                        {comment.username.split("@")[0]}
                      </CommentorName>
                    </Link>
                    <CommentText>{comment.commentText}</CommentText>
                  </NameCommentContainer>
                </CommentContainer>
              ))
            ) : (
              <FirstComment>Be The First To Comment</FirstComment>
            )}
            {currentUser ? (
              <NewCommentContainer
                onSubmit={(e) => handleCommentSubmit(e, post.id)}
              >
                <NewCommentAvatar src={currentUser?.avatar} alt="avatar" />
                <NewCommentInputContainer>
                  <NewCommentInput
                    type="text"
                    placeholder="Write your answer..."
                    onChange={(e) => setCommentText(e.target.value)}
                    onFocus={() => {
                      setCommentText("");
                      setActiveComment(post.id);
                    }}
                    onBlur={() => {
                      setActiveComment(null);
                    }}
                    value={post.id === activeComment ? commentText : ""}
                  />
                  <NewCommentButton type="submit">
                    <SendButton />
                  </NewCommentButton>
                </NewCommentInputContainer>
              </NewCommentContainer>
            ) : (
              <Link href="/login/" passHref>
                <LoginToComment>
                  You need to be logged in to comment
                </LoginToComment>
              </Link>
            )}
          </CommentsSection>
        </PostCard>
      ))}
    </Wrapper>
  );
}
