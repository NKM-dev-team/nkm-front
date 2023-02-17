import React from "react";
import { EFFECTS } from "../../img";
import { CharacterEffectType } from "../../types/game/character_effect/CharacterEffectType";

export default function CharacterEffectImage({
  name,
  type,
  width,
}: {
  name: string;
  type: CharacterEffectType;
  width?: string | number | undefined;
}) {
  return (
    <img
      src={
        EFFECTS[name.toLowerCase()] ??
        EFFECTS[type.toString().toLowerCase()] ??
        EFFECTS["empty"]
      }
      alt={name}
      width={width}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = EFFECTS["empty"];
      }}
    />
  );
}
