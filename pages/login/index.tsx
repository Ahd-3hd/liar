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
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../interfaces/user";

export default function Login() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    ({ currentUser }: { currentUser: IUser }) => currentUser
  );
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(currentUser);
  }, []);

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(signInWithEmailAndPassword(userData));
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
