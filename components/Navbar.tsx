import {
  Wrapper,
  NavLink,
  NavButton,
  Container,
  NavSpan,
} from "../styles/Navbar.style";
import Link from "next/link";
import UserIcon from "../utils/svg/UserIcon.svg";
import { auth } from "../config/config";
import { useRouter } from "next/router";
import HomeIcon from "../utils/svg/HomeIcon.svg";
import LogoutIcon from "../utils/svg/LogoutIcon.svg";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const handleSignout = async () => {
    await auth.signOut();
  };
  return (
    <Wrapper>
      <Container>
        <NavButton onClick={handleSignout}>
          <LogoutIcon />
          <NavSpan>LOGOUT</NavSpan>
        </NavButton>
        <Link href="/" passHref>
          <NavLink center>
            <HomeIcon />
            <NavSpan>HOME</NavSpan>
          </NavLink>
        </Link>
        <Link href="/profile/" passHref>
          <NavLink
            notification={currentUser?.friendRequestsReceived.length > 0}
          >
            <UserIcon />
            <NavSpan>PROFILE</NavSpan>
          </NavLink>
        </Link>
      </Container>
    </Wrapper>
  );
}
