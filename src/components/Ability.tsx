import React from "react";
import {Grid, Tooltip, Typography} from "@mui/material";
import {AbilityMetadata} from "../features/abilitiesSlice";
import AbilityImage from "./images/AbilityImage";
import DOMPurify from "dompurify"

function replaceVariables(str: string, vars: { [key: string]: number }): string {
  const keys = Object.keys(vars)
  return keys.reduce((acc, currentKey) => {
    const re = new RegExp(`{${currentKey}}`,"g");
    return acc.replace(re, vars[currentKey].toString())
  }, str)
}

export default function Ability({ am }: { am: AbilityMetadata }) {
  const description = replaceVariables(am.description, am.variables).replace("\n", "<br>");
  return (
    <Tooltip title={
      <>
        <Typography variant="h6" align="center">
          {am.name}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {am.alternateName}
        </Typography>
        <Typography variant="body2">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description)}} />
        </Typography>
        {am.variables["cooldown"] ?
          <Typography variant="body2">
            Cooldown: {am.variables["cooldown"]}
          </Typography>
          : ""}
      </>
    } arrow>
      <Grid item>
        <AbilityImage name={am.name} width={50}/>
      </Grid>
    </Tooltip>
  );
}
