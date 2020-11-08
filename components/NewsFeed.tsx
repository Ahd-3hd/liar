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
} from "../styles/NewsFeed.style";

export default function NewsFeed({
  title,
  posts,
}: {
  title: string;
  posts: any;
}) {
  console.log(posts);
  return (
    <Wrapper>
      <Title>{title}</Title>
      <CardsContainer>
        {posts.map((post: any) => (
          <NewsFeedCard key={post.postId}>
            <NewsFeedPosterSection>
              <AvatarContainer>
                <PosterAvatar src="/static/img/avatar.png" alt="avatar" />
              </AvatarContainer>
              <PostContainer>
                <PosterName>{post.userId}</PosterName>
                <PosterQuestion>{post.realQuestion}</PosterQuestion>
              </PostContainer>
            </NewsFeedPosterSection>
            <NewsFeedCommentsSection>
              {post.comments.length === 0 ? (
                <NoComments>There's no answers yet</NoComments>
              ) : (
                post.comments.map((comment: any) => (
                  <CommentComponent
                    commentorName={comment.userId}
                    commentText={comment.text}
                    key={comment.commentId}
                  />
                ))
              )}
            </NewsFeedCommentsSection>
          </NewsFeedCard>
        ))}
      </CardsContainer>
    </Wrapper>
  );
}
