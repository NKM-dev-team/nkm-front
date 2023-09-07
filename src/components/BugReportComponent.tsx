import React, { useState } from "react";
import CustomDialog from "./CustomDialog";
import BugReportForm from "./BugReportForm";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Fab } from "@mui/material";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export default function BugReportComponent() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Fab sx={fabStyle} color="error" onClick={() => setOpen(true)}>
        <BugReportIcon />
      </Fab>

      <CustomDialog
        open={open}
        setOpen={setOpen}
        title={"Report a bug"}
        content={<BugReportForm afterSubmit={() => setOpen(false)} />}
      />
    </>
  );
}
