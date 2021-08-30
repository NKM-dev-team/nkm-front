import React from "react";
import CharacterHexagon from "./CharacterHexagon";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

export default function DraggableCharacterHexagon({
  name,
  width,
}: {
  name: string;
  width?: string | number | undefined;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.HEX_CHARACTER,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div ref={drag}>
      <CharacterHexagon name={name} width={width} />
    </div>
  );
}
