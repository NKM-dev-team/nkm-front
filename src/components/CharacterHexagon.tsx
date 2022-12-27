import React from "react";
import CHARACTER_HEXAGONS from "../img/index";

export default function CharacterHexagon({
  name,
  width,
}: {
  name: string;
  width?: string | number | undefined;
}) {
  return (
    <img
      src={CHARACTER_HEXAGONS[name] ?? CHARACTER_HEXAGONS['Empty']}
      alt={name}
      width={width}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = CHARACTER_HEXAGONS['Empty']
      }}
    />
  );
}
