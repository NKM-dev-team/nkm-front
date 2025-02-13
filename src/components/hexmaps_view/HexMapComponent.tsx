import React from "react";
import Orientation from "../../types/Orientation";
import Point from "../../types/Point";
import { HexCellTemplate } from "../../types/game/hex/HexCellTemplate";
import { HexMapTemplate } from "../../types/game/hex/HexMapTemplate";

// TODO: move to HexCell class / interface
const cellY = (c: HexCellTemplate) => -c.coordinates.x - c.coordinates.z;

function cellTypeToColor(cellType: string) {
  switch (cellType) {
    case "Wall":
      return "black";
    case "Normal":
      return "white";
    case "SpawnPoint":
      return "green";
  }
}

function HexMapComponent({
  scale = 1,
  hexMap,
  onHexagonClick,
}: {
  scale?: number;
  hexMap: HexMapTemplate;
  onHexagonClick?: (c: HexCellTemplate) => void;
}) {
  const cells = hexMap.cellTemplates;
  const originX =
    -cells
      .map((c: HexCellTemplate) => c.coordinates.x)
      .reduce((a, b) => a + b, 0) / cells.length;
  const originY = -cells.map(cellY).reduce((a, b) => a + b, 0) / cells.length;

  console.log(hexMap.name, originX, originY);

  function cellToPixel(
    hexCell: HexCellTemplate,
    originX: number,
    originY: number
  ) {
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

  const polygons = hexMap.cellTemplates.map((c) => {
    const point = cellToPixel(c, originX, originY);
    return (
      <polygon
        key={c.coordinates.x + " " + c.coordinates.z}
        transform={`translate(${point.x}, ${point.y})`}
        fill={cellTypeToColor(c.cellType)}
        stroke="#1f1212"
        strokeWidth="0.06"
        points="1,0 0.5,0.8660254037844386 -0.5,0.8660254037844387 -1,1.2246467991473532e-16 -0.5,-0.8660254037844385 0.5,-0.8660254037844386"
        onClick={() => onHexagonClick && onHexagonClick(c)}
      />
    );
  });

  // Calculate the dimensions of the hexmap
  const minX = Math.min(
    ...cells.map((c) => cellToPixel(c, originX, originY).x)
  );
  const minY = Math.min(
    ...cells.map((c) => cellToPixel(c, originX, originY).y)
  );
  const maxX = Math.max(
    ...cells.map((c) => cellToPixel(c, originX, originY).x)
  );
  const maxY = Math.max(
    ...cells.map((c) => cellToPixel(c, originX, originY).y)
  );
  const width = maxX - minX;
  const height = maxY - minY;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  // Calculate the viewBox to center the hexmap
  const viewBoxX = centerX - width / 2;
  const viewBoxY = centerY - height / 2;
  const viewBoxWidth = width;
  const viewBoxHeight = height;

  return (
    // <svg height={600 * scale} viewBox={`-40 -50 100 100`}>
    //   <g transform="rotate(30)">{polygons}</g>
    // </svg>
    <svg
      height={height * scale}
      width={width * scale}
      viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
      transform="rotate(30)"
    >
      {/*<g transform="rotate(30)">{polygons}</g>*/}
      <g>{polygons}</g>
    </svg>
  );
}

export const MemoizedHexMapComponent = React.memo(
  HexMapComponent,
  (prevProps, nextProps) => {
    return prevProps.hexMap.name === nextProps.hexMap.name;
  }
);
