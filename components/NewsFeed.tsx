import {
  Wrapper,
  Title,
  CardsContainer,
  NewsFeedCard,
  NewsFeedPosterSection,
  NewsFeedCommentsSection,
  PosterAvatar,
  PostContainer,
  PosterName,
  PosterQuestion,
  AvatarContainer,
  CommentComponent,
  NoComments,
  NameRevealContainer,
  RevealButton,
  NewCommentContainer,
  TextArea,
  UserCommentAvatarContainer,
  UserCommentAvatar,
  CommentSubmitButton,
  NoPosts,
  LoginToComment,
} from "../styles/NewsFeed.style";
import { IPost } from "../interfaces/posts";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addComment } from "../redux/posts/postsSlice";
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

  const dispatch = useDispatch();
  const { posts, isLoading, fetchError } = useSelector(
    (state: any) => state.posts
  );

  useEffect(() => {
    if (page === "homepage") {
      dispatch(fetchPosts());
    } else if (page === "currentUser") {
      console.log(currentUser.userId);
      dispatch(fetchPosts(currentUser.userId));
    } else if (page === "userPage") {
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
  };
  const handleToggleReveal = () => {};
  return (
    <Wrapper>
      <Title>{title}</Title>
      <CardsContainer>
        {posts.length > 0 ? (
          posts.map((post: IPost) => {
            return (
              <NewsFeedCard key={post.id}>
                <NewsFeedPosterSection>
                  <Link
                    href={`/profile/${
                      post.userId !== currentUser?.userId ? post.userId : ""
                    }`}
                    passHref
                  >
                    <AvatarContainer>
                      <PosterAvatar src={post.avatar} alt="avatar" />
                    </AvatarContainer>
                  </Link>
                  <PostContainer>
                    <NameRevealContainer>
                      <PosterName>{post.email}</PosterName>
                      {post.commentorsIds.includes(currentUser?.userId) ? (
                        <RevealButton
                          isRevealed={post.isRevealed}
                          onClick={() => handleToggleReveal()}
                        >
                          {post.isRevealed ? "Hide" : "Reveal"}
                        </RevealButton>
                      ) : (
                        <RevealButton>Answer to reveal</RevealButton>
                      )}
                    </NameRevealContainer>

                    {post.isRevealed ? (
                      <PosterQuestion key="real">
                        {post.realQuestion}
                      </PosterQuestion>
                    ) : (
                      <PosterQuestion key="fake">
                        {post.fakeQuestion}
                      </PosterQuestion>
                    )}
                  </PostContainer>
                </NewsFeedPosterSection>
                <NewsFeedCommentsSection>
                  {post.comments.length === 0 ? (
                    <NoComments>
                      Be the first to answer this question
                    </NoComments>
                  ) : (
                    post.comments.map((comment) => (
                      <CommentComponent
                        key={comment.id}
                        commentorName={comment.username}
                        commentText={comment.commentText}
                        commentorAvatar={comment.avatar}
                      />
                    ))
                  )}
                </NewsFeedCommentsSection>
                {currentUser ? (
                  <NewCommentContainer
                    onSubmit={(e) => handleCommentSubmit(e, post.id)}
                  >
                    <UserCommentAvatarContainer>
                      <UserCommentAvatar
                        src={currentUser?.avatar}
                        alt="avatar"
                      />
                    </UserCommentAvatarContainer>
                    <TextArea
                      placeholder="write your answer..."
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <CommentSubmitButton type="submit">
                      SEND
                    </CommentSubmitButton>
                  </NewCommentContainer>
                ) : (
                  <Link href="/login/" passHref>
                    <LoginToComment>Login to answer</LoginToComment>
                  </Link>
                )}
              </NewsFeedCard>
            );
          })
        ) : (
          <NoPosts>There is No Posts</NoPosts>
        )}
      </CardsContainer>
    </Wrapper>
  );
}
