import {
  Container,
  Form,
  Title,
  CreateAccountLink,
  InputGroup,
  InputField,
  InputLabel,
} from "../../styles/login.style";
import { Button } from "../../components/Buttons";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { auth } from "../../config/config";

import { useRouter } from "next/router";
import firebase from "../../config/config";
import { setCurrentUser } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Signup() {
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newUser = await auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );
    await firebase.firestore().collection("users").doc(newUser.user?.uid).set({
      userId: newUser.user?.uid,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
      email: newUser.user?.email,
      friends: [],
    });
    if (newUser) {
      dispatch(
        setCurrentUser({
          userId: newUser.user?.uid,
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
          email: newUser.user?.email,
          friends: [],
        })
      );
    } else {
      dispatch(setCurrentUser(null));
    }
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/login/");
    }
  });

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <Container>
        <Title>Create a new account</Title>
        <Form onSubmit={handleSignup}>
          <InputGroup>
            <InputLabel>Email</InputLabel>
            <InputField
              type="email"
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Password</InputLabel>
            <InputField
              type="password"
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </InputGroup>
          <Button type="submit" variant="black">
            SIGNUP
          </Button>
        </Form>
        <Link href="/login" passHref>
          <CreateAccountLink>already have an account?</CreateAccountLink>
        </Link>
      </Container>
    </>
  );
}
