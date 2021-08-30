import React from "react";
import { HexCell } from "../features/hexMapSlice";
import Point from "../types/Point";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

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

export default function HexCellComponent({
  c,
  point,
  onHexagonClick,
  onHexagonCharacterDrop,
}: {
  c: HexCell;
  point: Point;
  onHexagonClick?: (c: HexCell) => void;
  onHexagonCharacterDrop?: (c: HexCell) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.HEX_CHARACTER,
    drop: () => onHexagonCharacterDrop && onHexagonCharacterDrop(c),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  return (
    <polygon
      ref={drop}
      transform={`translate(${point.x}, ${point.y})`}
      fill={cellTypeToColor(c.cellType)}
      stroke="#1f1212"
      strokeWidth="0.06"
      points="1,0 0.5000000000000001,0.8660254037844386 -0.4999999999999998,0.8660254037844387 -1,1.2246467991473532e-16 -0.5000000000000004,-0.8660254037844385 0.5000000000000001,-0.8660254037844386"
      onClick={() => onHexagonClick && onHexagonClick(c)}
    />
  );
}
