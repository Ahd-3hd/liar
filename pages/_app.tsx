import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import GlobalStyles from "../utils/GlobalStyles";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import { useEffect } from "react";
import firebase from "../config/config";
import "firebase/analytics";
import "react-toastify/dist/ReactToastify.css";
import "../css/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== undefined) {
      firebase.analytics();
    }
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
