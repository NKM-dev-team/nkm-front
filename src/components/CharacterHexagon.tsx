import React from "react";

export default function CharacterHexagon({
  name,
  width,
}: {
  name: string;
  width?: string | number | undefined;
}) {
  return (
    <img
      src={"/character_hexagons/" + name + ".png"}
      alt={name}
      width={width}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = "/character_hexagons/empty.png";
      }}
    />
  );
}
