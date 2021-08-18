import React from "react";

export default function CharacterHexagon({ name }: { name: string }) {
  return (
    <img
      src={"/character_hexagons/" + name + ".png"}
      alt={name}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = "/character_hexagons/empty.png";
      }}
    />
  );
}
