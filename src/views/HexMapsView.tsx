import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { HexMap } from "../features/hexMapSlice";
import HexMapComponent from "../components/HexMapComponent";

export default function HexMapsView() {
  const hexMapData = useSelector((state: RootState) => state.hexMapData);
  return (
    <>
      {hexMapData.hexMapList.map((hexMap: HexMap) => (
        <div key={hexMap.name}>
          <Typography>{hexMap.name}</Typography>
          <HexMapComponent hexMap={hexMap} />
        </div>
      ))}
    </>
  );
}
