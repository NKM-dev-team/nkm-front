import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import InputLabel from "@mui/material/FormLabel";
import { Slider, SliderProps } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  label: {
    marginTop: theme.spacing(2),
    color: theme.palette.common.white,
  },
}));

interface CustomSliderProps extends SliderProps {
  label: string;
}

export default function CustomSlider({ label, ...props }: CustomSliderProps) {
  const classes = useStyles();

  return (
    <>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Slider {...props} />
    </>
  );
}
