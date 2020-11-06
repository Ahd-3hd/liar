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

export default function NewsFeed() {
  return (
    <Wrapper>
      <Title>Newsfeed</Title>
      <CardsContainer>
        <NewsFeedCard>
          <NewsFeedPosterSection>
            <AvatarContainer>
              <PosterAvatar src="/static/img/avatar.png" alt="avatar" />
            </AvatarContainer>
            <PostContainer>
              <PosterName>john Doe</PosterName>
              <PosterQuestion>
                Tell me what you want what you really really want?
              </PosterQuestion>
            </PostContainer>
          </NewsFeedPosterSection>
          <NewsFeedCommentsSection>
            <CommentComponent
              commentorName="John doe"
              commentText="dis is da first comment yo!"
            />
            <CommentComponent
              commentorName="Smith Bro"
              commentText="dis is da second comment yo! ,dis is da second comment yo! ,dis is da second comment yo!"
            />
            <CommentComponent
              commentorName="Karen Fo"
              commentText="dis is da third comment yo!"
            />
          </NewsFeedCommentsSection>
        </NewsFeedCard>
        <NewsFeedCard>
          <NewsFeedPosterSection>
            <AvatarContainer>
              <PosterAvatar src="/static/img/avatar.png" alt="avatar" />
            </AvatarContainer>
            <PostContainer>
              <PosterName>john Doe</PosterName>
              <PosterQuestion>
                Tell me what you want what you really really want?
              </PosterQuestion>
            </PostContainer>
          </NewsFeedPosterSection>
          <NewsFeedCommentsSection>
            <CommentComponent
              commentorName="John doe"
              commentText="dis is da first comment yo!"
            />
            <CommentComponent
              commentorName="Smith Bro"
              commentText="dis is da second comment yo! ,dis is da second comment yo! ,dis is da second comment yo!"
            />
            <CommentComponent
              commentorName="Karen Fo"
              commentText="dis is da third comment yo!"
            />
          </NewsFeedCommentsSection>
        </NewsFeedCard>
      </CardsContainer>
    </Wrapper>
  );
}
