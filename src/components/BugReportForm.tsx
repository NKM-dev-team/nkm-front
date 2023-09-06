import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper } from "@mui/material";
import { postBugReportCreate } from "../features/helper";
import { CustomTextarea } from "./CustomTextarea";
import { enqueueNotificationError } from "../features/notificationSlice";

export interface BugReport {
  description: string;
}

function BugReportForm({ afterSubmit }: { afterSubmit: () => void }) {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ description }: BugReport) => {
    dispatch(postBugReportCreate(description, null));
    afterSubmit();
  };

  return (
    <Grid container justifyContent="center">
      <Paper style={{ position: "relative", zIndex: 0 }}>
        <Box p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextarea
                  placeholder="Describe the bug / suggestion"
                  name="description"
                  ref={register({ required: true, maxLength: 5 })}
                  onError={(error) =>
                    dispatch(enqueueNotificationError(errors.description))
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default BugReportForm;
