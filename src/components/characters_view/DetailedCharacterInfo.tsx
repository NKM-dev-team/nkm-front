import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CharacterHexagon from "../images/CharacterHexagon";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { CharacterMetadata } from "../../types/game/character/CharacterMetadata";
import CharacterStats from "./CharacterStats";
import DOMPurify from "dompurify";
import { abilityDescription } from "../../app/utils";
import AbilityImage from "../images/AbilityImage";
import Effect from "./Effect";
import { CharacterEffectMetadata } from "../../types/game/character_effect/CharacterEffectMetadata";
import _ from "lodash";

interface DetailedCharacterInfoProps {
  c: CharacterMetadata;
}

export default function DetailedCharacterInfo({
  c,
}: DetailedCharacterInfoProps) {
  const selectAbilitiesData = (state: RootState) => state.abilitiesData;
  const selectInitialAbilityMetadatas = createSelector(
    selectAbilitiesData,
    (abilitiesData) => {
      return c.initialAbilitiesMetadataIds
        .map((id) => abilitiesData.abilityMetadatas.find((a) => a.name === id))
        .flatMap((f) => (f ? [f] : []));
    }
  );
  const initialAbilityMetadatas = useSelector(selectInitialAbilityMetadatas);
  const effectMetadatas = useSelector(
    (state: RootState) => state.characterEffectsData
  ).characterEffectMetadatas;

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CharacterHexagon name={c.name} width={100} />
          </Grid>
          <Grid item xs={4}>
            <CharacterStats c={c} />
          </Grid>
          <Grid item container justifyContent="center" spacing={1}>
            {initialAbilityMetadatas.map((am) => (
              <>
                <Grid item xs={2}>
                  <AbilityImage name={am.name} width={50} />
                </Grid>
                <Grid item xs={10}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{am.name}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      {am.alternateName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>

                  {!_.isEmpty(am.relatedEffectIds) ? (
                    <>
                      <Typography variant="caption">
                        Related effects:
                      </Typography>
                      <Grid item container xs={12}>
                        {am.relatedEffectIds.map((eid) => {
                          const metadata = effectMetadatas.find(
                            (e) => e.name === eid
                          );
                          if (metadata) return <Effect em={metadata}></Effect>;
                          else return <Typography>{eid}</Typography>;
                        })}
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
