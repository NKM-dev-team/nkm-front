import React from "react";
import CustomDialog from "../CustomDialog";
import RegisterForm from "../RegisterForm";
import { Backdrop, CircularProgress } from "@mui/material";
import { RequestStatus } from "../../types/authState";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Button from "@mui/material/Button";

export default function RegisterDialog({
  registerViewOpen,
  setRegisterViewOpen,
  setLoginViewOpen,
}: {
  registerViewOpen: boolean;
  setRegisterViewOpen: (b: boolean) => void;
  setLoginViewOpen: (b: boolean) => void;
}) {
  const authData = useSelector((state: RootState) => state.authData);

  return (
    <CustomDialog
      open={registerViewOpen}
      setOpen={setRegisterViewOpen}
      title={"Register"}
      content={
        <>
          <Backdrop
            open={authData.registerRequestStatus === RequestStatus.Awaiting}
            style={{ position: "absolute", zIndex: 1 }}
          >
            <CircularProgress />
          </Backdrop>
          <RegisterForm />
          <Button
            color="secondary"
            onClick={() => {
              setLoginViewOpen(true);
              setRegisterViewOpen(false);
            }}
          >
            Login
          </Button>
        </>
      }
    />
  );
}
