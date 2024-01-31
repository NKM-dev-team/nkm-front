import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../CustomSelect";
import { RootState } from "../../app/store";
import { setApiVersion } from "../../features/settingsSlice";
import { ApiVersion } from "../../features/settingsSlice";

export default function SettingsView() {
  const dispatch = useDispatch();
  const apiVersion = useSelector(
    (state: RootState) => state.settingsData.apiVersion
  );

  const handleApiVersionChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    dispatch(setApiVersion(event.target.value as ApiVersion));
  };

  return (
    <>
      <Box m={3}>
        <Paper variant="outlined">
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <CustomSelect
              label="API Version"
              options={Object.values(ApiVersion)}
              value={apiVersion}
              onChange={handleApiVersionChange}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
