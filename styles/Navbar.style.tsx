import styled from "styled-components";
import Navbarbg from "../utils/svg/Navbg.svg";
import NewQuestionIcon from "../utils/svg/NewQuestion.svg";
import LogoutIcon from "../utils/svg/LogoutIcon.svg";
import UserIcon from "../utils/svg/UserIcon.svg";
import Link from "next/link";
import { auth } from "../config/config";
import { useRouter } from "next/router";

export default function NavContainer() {
  const handleSignout = async () => {
    await auth.signOut();
  };
  return <div></div>;
}
