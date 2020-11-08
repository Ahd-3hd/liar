import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import GlobalStyles from "../utils/GlobalStyles";
import Layout from "../components/Layout";
import { useReducer } from "react";
import PostsContext from "../context/postsContext";
import postsReducer from "../context/postsReducer";
import { ADD_POST } from "../context/types";

function MyApp({ Component, pageProps }: AppProps) {
  const initialState = {
    posts: [],
    postsCount: 0,
  };
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const addPost = (post: any) => {
    dispatch({
      type: ADD_POST,
      payload: post,
    });
  };
  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        addPost,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PostsContext.Provider>
  );
}

export default MyApp;
