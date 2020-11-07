import {
  Wrapper,
  UserInfoContainer,
  UserAvatar,
  Username,
} from "../../styles/Profile.style";
import NewsFeed from "../../components/NewsFeed";
import Head from "next/head";
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
        <NewsFeed title="My wall" />
      </Wrapper>
    </>
  );
}
