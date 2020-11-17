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
export default function Signup() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  useEffect(() => {});

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
