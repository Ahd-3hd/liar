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
export default function NewsFeed({
  title,
  page,
  friendId,
}: {
  title: string;
  page: string;
  friendId?: any;
}) {
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const currentUser = {
    userId: "1",
    avatar: "",
  };
  const posts = [
    {
      email: "a@a.com",
      id: "1",
      userId: "1",
      realQuestion: "real question",
      fakeQuestion: "fake question",
      isRevealed: false,
      comments: [],
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
    },
  ];

  useEffect(() => {}, []);

  const handleCommentSubmit = (
    e: { preventDefault: () => void },
    id: string
  ) => {
    e.preventDefault();
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
                      <RevealButton
                        isRevealed={post.isRevealed}
                        onClick={() => handleToggleReveal()}
                      >
                        {post.isRevealed ? "Hide" : "Reveal"}
                      </RevealButton>
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
