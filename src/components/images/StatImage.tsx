import React from "react";
import { STATS_IMG } from "../../img";

export default function StatImage({
  name,
  width,
}: {
  name: string;
  width?: string | number | undefined;
}) {
  return (
    <img
      src={STATS_IMG[name.toLowerCase()] ?? STATS_IMG["empty"]}
      alt={name}
      width={width}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = STATS_IMG["empty"];
      }}
    />
  );
}
