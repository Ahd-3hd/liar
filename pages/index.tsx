import Head from "next/head";
import { Wrapper } from "../styles/Home.style";
import NewQuestion from "../components/NewQuestion";
import NewsFeed from "../components/NewsFeed";
import { useContext } from "react";
import postsContext from "../context/postsContext";

export default function Home() {
  const context = useContext(postsContext);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Wrapper>
        <NewQuestion />
        <NewsFeed title="Newsfeed" posts={context.posts} />
      </Wrapper>
    </>
  );
}
