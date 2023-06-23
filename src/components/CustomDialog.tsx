import React from "react";
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CustomDialogProps extends DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  content: any;
}

export default function CustomDialog(p: CustomDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onClose = () => p.setOpen(false);

  return (
    <Dialog
      open={p.open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      fullScreen={fullScreen}
    >
      <DialogTitle id="alert-dialog-title">
        {p.title}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 20,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{p.content}</DialogContent>
    </Dialog>
  );
}
