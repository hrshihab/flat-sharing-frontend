"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = useUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };
  return (
    <>
      {userInfo?.userId ? (
        <Button color="error" onClick={handleLogOut}>
          Logout
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{
            borderRadius: 5,
            boxShadow: 2,
            fontWeight: { xs: 400, sm: 500, lg: 700 },
            fontSize: { xs: "0.7rem", sm: "1rem", lg: "auto" },
          }}
          component={Link}
          href="/login"
        >
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
