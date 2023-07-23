import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { Credentials } from "../types/Credentials";
import { authenticate } from "../features/authSlice";

function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ email, password }: Credentials) => {
    dispatch(authenticate({ email: email, password }));
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
                  label="Email"
                  name="email"
                  type="email"
                  inputRef={register({ required: true })}
                  error={!!errors.email}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Password"
                  name="password"
                  type="password"
                  inputRef={register({ required: true })}
                  error={!!errors.password}
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
                  Login
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
