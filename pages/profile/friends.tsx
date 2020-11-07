import Head from "next/head";
import Link from "next/link";
import {
  Wrapper,
  TitleContainer,
  Title,
  ViewRequestsLink,
} from "../../styles/Friends.style";

export default function Friends() {
  return (
    <>
      <Head>
        <title>Friends</title>
      </Head>
      <Wrapper>
        <TitleContainer>
          <Title>My Friends - 17</Title>
          <Link href="/friends/requests/" passHref>
            <ViewRequestsLink>View Requests</ViewRequestsLink>
          </Link>
        </TitleContainer>
      </Wrapper>
    </>
  );
}
