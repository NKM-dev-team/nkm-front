import React from "react";
import { CHARACTER_HEXAGONS } from "../../img";
import { Tooltip } from "@mui/material";

export default function CharacterHexagon({
  name,
  width,
  tooltip = false,
}: {
  name: string;
  width?: string | number | undefined;
  tooltip?: boolean;
}) {
  const image = (
    <img
      src={
        CHARACTER_HEXAGONS[name.toLowerCase()] ?? CHARACTER_HEXAGONS["empty"]
      }
      alt={name}
      width={width}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = CHARACTER_HEXAGONS["empty"];
      }}
    />
  );
  if (tooltip) {
    return (
      <Tooltip title={name} arrow>
        {image}
      </Tooltip>
    );
  } else return image;
}
