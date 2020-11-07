import {
  Wrapper,
  UserInfoContainer,
  UserAvatar,
  Username,
  FriendsWrapper,
  FriendsContainer,
  FriendLink,
  FriendAvatar,
  FriendsPageLink,
} from "../../styles/Profile.style";
import NewsFeed from "../../components/NewsFeed";
import Head from "next/head";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <Wrapper>
        <UserInfoContainer>
          <UserAvatar src="/static/img/avatar.png" alt="avatar" />
          <Username>John Doe</Username>
        </UserInfoContainer>
        <FriendsWrapper>
          <FriendsContainer>
            <Link href="profile/2" passHref>
              <FriendLink>
                <FriendAvatar src="/static/img/avatar.png" alt="avatar" />
              </FriendLink>
            </Link>
            <Link href="profile/3" passHref>
              <FriendLink>
                <FriendAvatar src="/static/img/avatar.png" alt="avatar" />
              </FriendLink>
            </Link>
            <Link href="profile/4" passHref>
              <FriendLink>
                <FriendAvatar src="/static/img/avatar.png" alt="avatar" />
              </FriendLink>
            </Link>
            <Link href="profile/4" passHref>
              <FriendLink>
                <FriendAvatar src="/static/img/avatar.png" alt="avatar" />
              </FriendLink>
            </Link>
            <Link href="profile/4" passHref>
              <FriendLink>
                <FriendAvatar src="/static/img/avatar.png" alt="avatar" />
              </FriendLink>
            </Link>
          </FriendsContainer>
          <Link href="profile/1/friends" passHref>
            <FriendsPageLink>
              Friends
              <br />
              Page
            </FriendsPageLink>
          </Link>
        </FriendsWrapper>

        <NewsFeed title="My wall" />
      </Wrapper>
    </>
  );
}
