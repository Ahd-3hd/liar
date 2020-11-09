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
} from "../styles/NewsFeed.style";
import { useSelector, useDispatch } from "react-redux";
import { IPost } from "../interfaces/posts";
import { useState } from "react";
import { ADD_COMMENT, TOGGLE_REVEAL } from "../redux/types";

export default function NewsFeed({ title }: { title: string }) {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector(({ posts }: { posts: IPost[] }) => posts);

  const handleCommentSubmit = (
    e: { preventDefault: () => void },
    id: string
  ) => {
    e.preventDefault();
    dispatch({
      type: ADD_COMMENT,
      payload: {
        commentText,
        postId: id,
      },
    });
    setCommentText("");
  };
  const handleToggleReveal = (postId: string, isRevealed: boolean) => {
    dispatch({
      type: TOGGLE_REVEAL,
      payload: {
        postId: postId,
        isRevealed: isRevealed,
      },
    });
  };
  return (
    <Wrapper>
      <Title>{title}</Title>
      <CardsContainer>
        {posts.length > 0 ? (
          posts.map((post: IPost) => {
            return (
              <NewsFeedCard key={post.id}>
                <NewsFeedPosterSection>
                  <AvatarContainer>
                    <PosterAvatar src="/static/img/avatar.png" alt="avatar" />
                  </AvatarContainer>
                  <PostContainer>
                    <NameRevealContainer>
                      <PosterName>{post.userId}</PosterName>
                      <RevealButton
                        isRevealed={post.isRevealed}
                        onClick={() =>
                          handleToggleReveal(post.id, post.isRevealed)
                        }
                      >
                        {post.isRevealed ? "Hide" : "Reveal"}
                      </RevealButton>
                    </NameRevealContainer>
                    <PosterQuestion>
                      {post.isRevealed ? post.realQuestion : post.fakeQuestion}
                    </PosterQuestion>
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
                        commentText={comment.text}
                      />
                    ))
                  )}
                </NewsFeedCommentsSection>
                <NewCommentContainer
                  onSubmit={(e) => handleCommentSubmit(e, post.id)}
                >
                  <UserCommentAvatarContainer>
                    <UserCommentAvatar
                      src="/static/img/avatar.png"
                      alt="avatar"
                    />
                  </UserCommentAvatarContainer>
                  <TextArea
                    placeholder="write your answer..."
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <CommentSubmitButton type="submit">SEND</CommentSubmitButton>
                </NewCommentContainer>
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
