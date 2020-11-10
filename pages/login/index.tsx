import {
  Container,
  Form,
  Input,
  Title,
  CreateAccountLink,
} from "../../styles/login.style";
import { Button } from "../../components/Buttons";
import Link from "next/link";
import Head from "next/head";
export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <Title>Login to your account</Title>
        <Form>
          <Input label="E-mail" type="email" />
          <Input label="Password" type="password" />
          <Button>Login</Button>
        </Form>
        <Link href="/register" passHref>
          <CreateAccountLink>or create a new account</CreateAccountLink>
        </Link>
      </Container>
    </>
  );
}
