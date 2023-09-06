import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { postBugReportCreate } from "../features/helper";
import LoginForm from "./LoginForm";

export interface BugReport {
  description: string;
}

function BugReportForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ description }: BugReport) => {
    dispatch(postBugReportCreate(description, null));
  };

  return (
    <Grid container justifyContent="center">
      <Paper style={{ position: "relative", zIndex: 0 }}>
        <Box p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Describe the bug / suggestion"
                  name="description"
                  type="description"
                  inputRef={register({ required: true, maxLength: 1000 })}
                  // error={!!errors.email}
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

export default LoginForm;
