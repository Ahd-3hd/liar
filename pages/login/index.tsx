import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { auth } from "../../config/config";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Wrapper,
  LoginForm,
  LoginTitle,
  Input,
  Button,
  SignupLink,
} from "../../styles/login.style";
export default function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { currentUser, isLoading, fetchError } = useSelector(
    (state: any) => state.auth
  );

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(userData.email, userData.password);
    } catch (err) {
      toast("something went wrong; check your credentials");
    }
  };
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [handleLogin]);

  return (
    <>
      <Head>
        <title>LOGIN</title>
      </Head>
      <Wrapper>
        <LoginForm onSubmit={handleLogin}>
          <LoginTitle>Login to Got'cha</LoginTitle>
          <Input
            type="email"
            required
            placeholder="e-mail address"
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            required
            placeholder="password"
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
          <Button type="submit">LOGIN</Button>
          <Link href="/signup/" passHref>
            <SignupLink>Create an account</SignupLink>
          </Link>
        </LoginForm>
      </Wrapper>
    </>
  );
}
