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
import { useEffect, useState } from "react";
import {
  addComment,
  toggleReveal,
  fetchPosts,
  fetchPostsCurrentUser,
  fetchPostsUser,
} from "../redux/actions/postsActions";
import { useRouter } from "next/router";

export default function NewsFeed({
  title,
  page,
}: {
  title: string;
  page: string;
}) {
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector(({ posts }: { posts: IPost[] }) => posts);
  const currentUser = useSelector(
    ({ auth }: { auth: any }) => auth.currentUser
  );
  useEffect(() => {
    console.log(currentUser);
    if (page === "homepage") {
      dispatch(fetchPosts());
    } else if (page === "currentUser") {
      dispatch(fetchPostsCurrentUser(currentUser.userId));
    } else if (page === "userPage") {
      //TODO this should be changed to user id from fb
      dispatch(fetchPostsUser("ziQ1AXLYFEe7yzSo1zT2nWIdPvw1"));
    }
  }, []);

  const handleCommentSubmit = (
    e: { preventDefault: () => void },
    id: string
  ) => {
    e.preventDefault();
    dispatch(
      addComment({
        commentText,
        postId: id,
        userid: currentUser.userId,
        email: currentUser.email,
        avatar: currentUser.avatar,
      })
    );
    setCommentText("");
  };
  const handleToggleReveal = (postId: string, isRevealed: boolean) => {
    dispatch(toggleReveal({ postId: postId, isRevealed: isRevealed }));
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
                    <PosterAvatar src={post.avatar} alt="avatar" />
                  </AvatarContainer>
                  <PostContainer>
                    <NameRevealContainer>
                      <PosterName>{post.email}</PosterName>
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
                        commentText={comment.commentText}
                        commentorAvatar={comment.avatar}
                      />
                    ))
                  )}
                </NewsFeedCommentsSection>
                <NewCommentContainer
                  onSubmit={(e) => handleCommentSubmit(e, post.id)}
                >
                  <UserCommentAvatarContainer>
                    <UserCommentAvatar src={currentUser?.avatar} alt="avatar" />
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
