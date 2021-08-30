import { HexMap } from "../features/hexMapSlice";
import { HexCell } from "../features/hexMapSlice";
import React from "react";
import Orientation from "../types/Orientation";
import Point from "../types/Point";
import HexCellComponent from "./HexCellComponent";

// TODO: move to HexCell class / interface
const cellY = (c: HexCell) => -c.coordinates.x - c.coordinates.z;

function HexMapComponent({
  scale = 1,
  hexMap,
  onHexagonClick,
}: {
  scale?: number;
  hexMap: HexMap;
  onHexagonClick?: (c: HexCell) => void;
}) {
  const cells = hexMap.cells;
  const originX =
    -cells.map((c: HexCell) => c.coordinates.x).reduce((a, b) => a + b, 0) /
    cells.length;
  const originY = -cells.map(cellY).reduce((a, b) => a + b, 0) / cells.length;

  function cellToPixel(hexCell: HexCell, originX: number, originY: number) {
    const spacing = 1;
    const M = new Orientation(
      3.0 / 2.0,
      0.0,
      Math.sqrt(3.0) / 2.0,
      Math.sqrt(3.0),
      2.0 / 3.0,
      0.0,
      -1.0 / 3.0,
      Math.sqrt(3.0) / 3.0,
      0.0
    );
    let x = M.f0 * hexCell.coordinates.x + M.f1 * cellY(hexCell);
    let y = M.f2 * hexCell.coordinates.x + M.f3 * cellY(hexCell);
    // Apply spacing
    x = x * spacing;
    y = y * spacing;
    return new Point(x + originX, y + originY);
  }

  const polygons = hexMap.cells.map((c) => {
    const point = cellToPixel(c, originX, originY);
    return (
      <HexCellComponent
        key={c.coordinates.x + " " + c.coordinates.z}
        c={c}
        point={point}
        onHexagonClick={onHexagonClick}
        onHexagonCharacterDrop={(c) =>
          console.log("Dropped " + JSON.stringify(c.coordinates))
        }
      />
    );
  });

  return (
    <svg height={800 * scale} viewBox={`-50 -50 100 100`}>
      <g transform="rotate(30)">{polygons}</g>
    </svg>
  );
}

export const MemoizedHexMapComponent = React.memo(
  HexMapComponent,
  (prevProps, nextProps) => {
    return prevProps.hexMap.name === nextProps.hexMap.name;
  }
);
