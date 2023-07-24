export {};

import Orientation from "../src/types/Orientation";
import { HexCellTemplate } from "../src/types/game/hex/HexCellTemplate";

function cellY(c: HexCellTemplate) {
  return -c.coordinates.x - c.coordinates.z;
}

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
  return { x: x + originX, y: y + originY };
}

// Rest of your functions and code (same as in your original code)

self.onmessage = function (e: MessageEvent) {
  const { scale, hexMap, originX, originY } = e.data;
  const cells = hexMap.cellTemplates;

  const polygons = cells.map((c: HexCellTemplate) => {
    const point = cellToPixel(c, originX, originY);
    return {
      c: c,
      key: c.coordinates.x + " " + c.coordinates.z,
      transform: `translate(${point.x}, ${point.y})`,
      fill: cellTypeToColor(c.cellType),
      stroke: "#1f1212",
      strokeWidth: "0.06",
      points:
        "1,0 0.5,0.8660254037844386 -0.5,0.8660254037844387 -1,1.2246467991473532e-16 -0.5,-0.8660254037844385 0.5,-0.8660254037844386",
    };
  });

  // Calculate the dimensions of the hexmap
  const minX = Math.min(
    ...cells.map((c: HexCellTemplate) => cellToPixel(c, originX, originY).x)
  );
  const minY = Math.min(
    ...cells.map((c: HexCellTemplate) => cellToPixel(c, originX, originY).y)
  );
  const maxX = Math.max(
    ...cells.map((c: HexCellTemplate) => cellToPixel(c, originX, originY).x)
  );
  const maxY = Math.max(
    ...cells.map((c: HexCellTemplate) => cellToPixel(c, originX, originY).y)
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

  const message = {
    polygons,
    height: height * scale,
    width: width * scale,
    viewBox: `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`,
  };

  self.postMessage(message);
};
