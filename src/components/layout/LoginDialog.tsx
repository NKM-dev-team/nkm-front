import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LoginForm from "../LoginForm";
import CustomDialog from "../CustomDialog";
import GoogleLoginButton from "./GoogleLoginButton";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { RequestStatus } from "../../types/authState";

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
      open={loginViewOpen && !authData.token}
      setOpen={setLoginViewOpen}
      title={"Login"}
      content={
        <>
          <Backdrop
            open={authData.loginRequestStatus === RequestStatus.Awaiting}
            style={{ position: "absolute", zIndex: 1 }}
          >
            <CircularProgress />
          </Backdrop>
          <LoginForm />
          <Grid container justifyContent="center" p={1}>
            <GoogleLoginButton />
          </Grid>

          <Button
            color="secondary"
            onClick={() => {
              setLoginViewOpen(false);
              setRegisterViewOpen(true);
            }}
          >
            Create an account
          </Button>
        </>
      }
    />
  );
}
