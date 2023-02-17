import React from "react";
import { CharacterEffectMetadata } from "../../types/game/character_effect/CharacterEffectMetadata";
import { Grid, Tooltip, Typography } from "@mui/material";
import CharacterEffectImage from "../images/CharacterEffectImage";

export default function Effect({ em }: { em: CharacterEffectMetadata }) {
  return (
    <Tooltip
      title={
        <>
          <Typography variant="h6" align="center">
            {em.name}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {em.initialEffectType}
          </Typography>
          <Typography variant="body2" align="center">
            {em.description}
          </Typography>
        </>
      }
      arrow
    >
      <Grid item>
        <CharacterEffectImage
          name={em.name}
          type={em.initialEffectType}
          width={30}
        />
      </Grid>
    </Tooltip>
  );
}
