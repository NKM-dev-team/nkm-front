import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { fetchBugReports, postBugReportCreate } from "../features/helper";
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
    dispatch(fetchBugReports());
  };

  return (
    <Grid container justifyContent="center">
      <Paper style={{ position: "relative", zIndex: 0 }}>
        <Box p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Describe the bug / suggestion"
                  name="description"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Description is required.",
                    },
                    maxLength: {
                      value: 5000,
                      message: "Description is limited to 5000 characters.",
                    },
                  })}
                  onError={(error) =>
                    dispatch(enqueueNotificationError(errors.description))
                  }
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  multiline
                  rows={6}
                  autoFocus
                  fullWidth
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
