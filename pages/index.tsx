import Head from "next/head";
import { Wrapper } from "../styles/Home.style";
import NewQuestion from "../components/NewQuestion";
import NewsFeed from "../components/NewsFeed";
import { fetchPosts } from "../redux/posts/postsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Wrapper>
        <NewQuestion />
        <NewsFeed title="Newsfeed" page="homepage" />
      </Wrapper>
    </>
  );
}

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//       allow write: if request.auth != null;
//     }
//   }
// }
