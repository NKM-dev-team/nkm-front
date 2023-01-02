import React from "react";
import {CHARACTER_HEXAGONS} from "../../img";

export default function CharacterHexagon({
  name,
  width,
}: {
  name: string;
  width?: string | number | undefined;
}) {
  return (
    <img
      src={CHARACTER_HEXAGONS[name.toLowerCase()] ?? CHARACTER_HEXAGONS['empty']}
      alt={name}
      width={width}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = CHARACTER_HEXAGONS['empty']
      }}
    />
  );
}
