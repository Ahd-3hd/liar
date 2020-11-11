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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../config/config";
import {
  clearCurrentUser,
  setCurrentUser,
} from "../../redux/actions/authActions";
export default function Login() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((user) => dispatch(setCurrentUser(user)))
      .catch((err) => dispatch(clearCurrentUser()));
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <Title>Login to your account</Title>
        <Form onSubmit={handleLogin}>
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
          <Button type="submit">Login</Button>
        </Form>
        <Link href="/register" passHref>
          <CreateAccountLink>or create a new account</CreateAccountLink>
        </Link>
      </Container>
    </>
  );
}
