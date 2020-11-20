import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { auth } from "../../config/config";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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

  return <></>;
}
