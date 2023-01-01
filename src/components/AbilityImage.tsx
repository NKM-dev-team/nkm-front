import React from "react";
import {ABILITIES} from "../img";

export default function AbilityImage({
  name,
  width,
}: {
  name: string;
  width?: string | number | undefined;
}) {
  return (
    <img
      src={ABILITIES[name.toLowerCase()] ?? ABILITIES['empty']}
      alt={name}
      width={width}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = ABILITIES['empty']
      }}
    />
  );
}
