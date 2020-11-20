import Head from "next/head";
import { fetchPosts } from "../redux/posts/postsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <p>How many fucks do you still give ?</p>
    </>
  );
}
