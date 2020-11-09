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
  CommentContainer,
} from "../styles/NewsFeed.style";
import { useSelector } from "react-redux";
import { IPost } from "../interfaces/posts";

export default function NewsFeed({ title }: { title: string }) {
  const posts = useSelector(({ posts }: { posts: IPost[] }) => posts);
  console.log({ posts });
  return (
    <Wrapper>
      <Title>{title}</Title>
      <CardsContainer>
        {posts.map((post: IPost) => {
          return (
            <NewsFeedCard key={post.id}>
              <NewsFeedPosterSection>
                <AvatarContainer>
                  <PosterAvatar src="/static/img/avatar.png" alt="avatar" />
                </AvatarContainer>
                <PostContainer>
                  <NameRevealContainer>
                    <PosterName>{post.username}</PosterName>
                    <RevealButton isRevealed={post.isRevealed}>
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
                  <NoComments>Be the first to answer this question</NoComments>
                ) : (
                  post.comments.map((comment) => (
                    <CommentComponent
                      key={comment.id}
                      commentorName="John doe"
                      commentText="dis is da first comment yo!"
                    />
                  ))
                )}
              </NewsFeedCommentsSection>
              <NewCommentContainer>
                <UserCommentAvatarContainer>
                  <UserCommentAvatar
                    src="/static/img/avatar.png"
                    alt="avatar"
                  />
                </UserCommentAvatarContainer>
                <TextArea placeholder="write your answer..." />
              </NewCommentContainer>
            </NewsFeedCard>
          );
        })}
      </CardsContainer>
    </Wrapper>
  );
}
