import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LoginForm from "../LoginForm";
import CustomDialog from "../CustomDialog";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginDialog({
  loginViewOpen,
  setLoginViewOpen,
  setRegisterViewOpen,
}: {
  loginViewOpen: boolean;
  setLoginViewOpen: (b: boolean) => void;
  setRegisterViewOpen: (b: boolean) => void;
}) {
  const authData = useSelector((state: RootState) => state.authData);

  return (
    <CustomDialog
      open={loginViewOpen && !authData.email}
      setOpen={setLoginViewOpen}
      title={"Login"}
      content={
        <>
          <LoginForm />
          <Button
            color="secondary"
            onClick={() => {
              setLoginViewOpen(false);
              setRegisterViewOpen(true);
            }}
          >
            Create an account
          </Button>
          <GoogleLoginButton />
        </>
      }
    />
  );
}
