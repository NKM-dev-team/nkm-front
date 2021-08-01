import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/FormLabel";
import { MenuItem, TextField } from "@material-ui/core";
import { OutlinedTextFieldProps } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    padding: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px 0`,
    "& fieldset": {
      borderColor: theme.palette.primary.main,
      borderRadius: "17px",
    },
    "& input": {
      background: theme.palette.background.paper,
      borderRadius: "17px",
      padding: theme.spacing(2, 1, 2, 1),
    },
    "& .MuiSelect-select": {
      background: theme.palette.background.paper,
      borderRadius: "17px",
      padding: theme.spacing(2, 1, 2, 1),
    },
  },
  label: {
    marginTop: theme.spacing(2),
    color: theme.palette.common.white,
  },
}));

interface CustomSelectProps extends Omit<OutlinedTextFieldProps, "variant"> {
  options: string[];
}

export default function CustomSelect({
  label,
  options,
  ...props
}: CustomSelectProps) {
  const classes = useStyles();

  return (
    <>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <TextField
        select
        variant="outlined"
        className={classes.textField}
        fullWidth
        {...props}
      >
        {options.map((e: string) => (
          <MenuItem key={e} value={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
