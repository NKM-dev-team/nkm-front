import React from "react";
import CustomDialog from "../CustomDialog";
import RegisterForm from "../RegisterForm";

export default function RegisterDialog({
  registerViewOpen,
  setRegisterViewOpen,
}: {
  registerViewOpen: boolean;
  setRegisterViewOpen: (b: boolean) => void;
}) {
  return (
    <CustomDialog
      open={registerViewOpen}
      setOpen={setRegisterViewOpen}
      title={"Register"}
      content={<RegisterForm />}
    />
  );
}
