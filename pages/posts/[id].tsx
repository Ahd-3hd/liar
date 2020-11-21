import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
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
} from "../../styles/NewsFeed.style";
import { useRouter } from "next/router";
import RemoveIcon from "../../utils/svg/RemoveIcon.svg";
import HideIcon from "../../utils/svg/HideIcon.svg";
import RevealIcon from "../../utils/svg/RevealIcon.svg";
import SendButton from "../../utils/svg/SendIcon.svg";
import {
  fetchPosts,
  addComment,
  toggleReveal,
  deletePost,
} from "../../redux/posts/postsSlice";
import firebase from "../../config/config";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function Post() {
  const router = useRouter();
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const [commentText, setCommentText] = useState("");
  const [activeComment, setActiveComment] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const getPost = async (id: string) => {
    const fetchedPost = await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get();
    setPost({
      ...fetchedPost.data(),
      id: fetchedPost.id,
    });
  };
  useEffect(() => {
    if (router.query.id) {
      getPost(router.query.id as string);
    }
  }, [router]);
  const dispatch = useDispatch();

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
    const fetchedPost = await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get();
    setPost({
      ...fetchedPost.data(),
      id: fetchedPost.id,
    });
  };
  const handleToggleReveal = (postId: string) => {
    dispatch(toggleReveal(postId));
    setPost((prevState: any) => ({
      ...prevState,
      isRevealed: !prevState.isRevealed,
    }));
  };

  const handleDeletePost = async (postId: string) => {
    await dispatch(deletePost(postId));
    router.push("/");
  };
  if (!post) return <p>Loading..</p>;
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <Wrapper>
        <PostCard key={post.id} style={{ marginBottom: "10rem" }}>
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
                    <PostButton
                      variant="danger"
                      onClick={() => handleDeletePost(post.id)}
                    >
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
                  <PosterName>{post.username}</PosterName>
                </Link>
              </NameButtonsContainer>
              <Link href={`/posts/${post.id}`} passHref key={post.id}>
                <QuestionText status={post.isRevealed} target="_blank">
                  {post.isRevealed ? post.realQuestion : post.fakeQuestion}
                </QuestionText>
              </Link>
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
                      <CommentorName>{comment.username}</CommentorName>
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
      </Wrapper>
    </>
  );
}
