import React from "react";
import { Grid, Tooltip, Typography } from "@mui/material";
import AbilityImage from "../images/AbilityImage";
import DOMPurify from "dompurify";
import {
  abilityDescription,
  AbilityMetadata,
} from "../../types/game/ability/AbilityMetadata";

export default function Ability({ am }: { am: AbilityMetadata }) {
  return (
    <Tooltip
      title={
        <>
          <Typography variant="h6" align="center">
            {am.name}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {am.alternateName}
          </Typography>
          <Typography variant="body2">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(abilityDescription(am)),
              }}
            />
          </Typography>
          {am.variables["cooldown"] ? (
            <Typography variant="body2">
              Cooldown: {am.variables["cooldown"]}
            </Typography>
          ) : (
            ""
          )}
        </>
      }
      arrow
    >
      <Grid item>
        <AbilityImage name={am.name} width={50} />
      </Grid>
    </Tooltip>
  );
}
