import { GameEventView } from "../../types/game/GameEventView";
import { GameStateView } from "../../types/game/GameStateView";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import CharacterHexagon from "../images/CharacterHexagon";
import AbilityImage from "../images/AbilityImage";
import CharacterEffectImage from "../images/CharacterEffectImage";
import { CharacterEffectType } from "../../types/game/character_effect/CharacterEffectType";

interface GameEventImagesProps {
  gameEvent: GameEventView;
  gameState: GameStateView;
}

export default function GameEventImages({
  gameEvent,
  gameState,
}: GameEventImagesProps) {
  const event = JSON.parse(gameEvent.eventJson);
  const images = [];

  if (gameEvent.className === "ClockUpdated") {
    images.push(<AccessTimeIcon key="clock" />);
  }

  if (event.characterId) {
    const characterView = gameState.characters.find(
      (c) => c.id === event.characterId
    );
    if (characterView) {
      images.push(
        <CharacterHexagon
          key={`character-${characterView.id}`}
          name={characterView.state?.name || characterView.metadataId}
          width={20}
        />
      );
    }
  }

  if (event.abilityId) {
    const abilityView = gameState.abilities.find(
      (a) => a.id === event.abilityId
    );
    if (abilityView) {
      images.push(
        <AbilityImage
          key={`ability-${abilityView.id}`}
          name={abilityView.metadataId}
          width={20}
        />
      );
    }
  }

  if (event.effectId) {
    const effectView = gameState.effects.find((e) => e.id === event.effectId);

    if (effectView) {
      images.push(
        <CharacterEffectImage
          key={`effect-${effectView.id}`}
          name={effectView.metadataId}
          type={effectView.effectType}
          width={20}
        />
      );
    }
  } else if (event.effectMetadataId) {
    images.push(
      <CharacterEffectImage
        name={event.effectMetadataId}
        type={CharacterEffectType.Mixed}
        width={20}
      />
    );
  }

  return <>{images.length > 0 ? images : null}</>;
}
