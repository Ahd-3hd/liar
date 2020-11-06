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
} from "../styles/NewsFeed.style";

export default function NewsFeed() {
  return (
    <Wrapper>
      <Title>Popular</Title>
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
          <NewsFeedCommentsSection></NewsFeedCommentsSection>
        </NewsFeedCard>
      </CardsContainer>
    </Wrapper>
  );
}
