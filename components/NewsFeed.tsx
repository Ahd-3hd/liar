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
                  <PosterName>{post.username}</PosterName>
                  <PosterQuestion>{post.fakeQuestion}</PosterQuestion>
                </PostContainer>
              </NewsFeedPosterSection>
              <NewsFeedCommentsSection>
                {post.comments.map((comment) => (
                  <CommentComponent
                    key={comment.id}
                    commentorName="John doe"
                    commentText="dis is da first comment yo!"
                  />
                ))}
              </NewsFeedCommentsSection>
            </NewsFeedCard>
          );
        })}
      </CardsContainer>
    </Wrapper>
  );
}
