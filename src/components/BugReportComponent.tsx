import React, { useState } from "react";
import bug from "../../img/bug.svg";
import CustomDialog from "./CustomDialog";
import BugReportForm from "./BugReportForm";

interface BugReportComponentProps {}

export default function BugReportComponent({}: BugReportComponentProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={bug}
        alt={"Report a bug"}
        width={50}
        style={{ alignSelf: "center" }}
        onClick={() => setOpen(true)}
      />

      <CustomDialog
        open={open}
        setOpen={setOpen}
        title={"Report a bug"}
        content={<BugReportForm />}
      />
    </>
  );
}
