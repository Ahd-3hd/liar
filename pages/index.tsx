import Head from "next/head";
import { Wrapper } from "../styles/Home.style";
import NewQuestion from "../components/NewQuestion";
import NewsFeed from "../components/NewsFeed";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Wrapper>
        <NewQuestion />
        <NewsFeed />
      </Wrapper>
    </>
  );
}
