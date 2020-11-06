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
  CommentorAvatarContainer,
  CommentorAvatar,
  CommentorContainer,
  CommentorName,
  Comment,
  CommentContainer,
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
          <NewsFeedCommentsSection>
            <CommentContainer>
              <CommentorAvatarContainer>
                <CommentorAvatar src="/static/img/avatar.png" alt="avatar" />
              </CommentorAvatarContainer>
              <CommentorContainer>
                <CommentorName>Smith Duck</CommentorName>
                <Comment>
                  Hello, this is a comment to this question that you just asked!
                </Comment>
              </CommentorContainer>
            </CommentContainer>
            <CommentContainer>
              <CommentorAvatarContainer>
                <CommentorAvatar src="/static/img/avatar.png" alt="avatar" />
              </CommentorAvatarContainer>
              <CommentorContainer>
                <CommentorName>Smith Duck</CommentorName>
                <Comment>
                  Hello, this is a comment to this question that you just asked!
                </Comment>
              </CommentorContainer>
            </CommentContainer>
            <CommentContainer>
              <CommentorAvatarContainer>
                <CommentorAvatar src="/static/img/avatar.png" alt="avatar" />
              </CommentorAvatarContainer>
              <CommentorContainer>
                <CommentorName>Smith Duck</CommentorName>
                <Comment>
                  Hello, this is a comment to this question that you just asked!
                </Comment>
              </CommentorContainer>
            </CommentContainer>
            <CommentContainer>
              <CommentorAvatarContainer>
                <CommentorAvatar src="/static/img/avatar.png" alt="avatar" />
              </CommentorAvatarContainer>
              <CommentorContainer>
                <CommentorName>Smith Duck</CommentorName>
                <Comment>
                  Hello, this is a comment to this question that you just asked!
                </Comment>
              </CommentorContainer>
            </CommentContainer>
            <CommentContainer>
              <CommentorAvatarContainer>
                <CommentorAvatar src="/static/img/avatar.png" alt="avatar" />
              </CommentorAvatarContainer>
              <CommentorContainer>
                <CommentorName>Smith Duck</CommentorName>
                <Comment>
                  Hello, this is a comment to this question that you just asked!
                </Comment>
              </CommentorContainer>
            </CommentContainer>
          </NewsFeedCommentsSection>
        </NewsFeedCard>
      </CardsContainer>
    </Wrapper>
  );
}
