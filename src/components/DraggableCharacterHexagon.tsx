import React from "react";
import CharacterHexagon from "./CharacterHexagon";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

export default function DraggableCharacterHexagon({
  name,
  characterId,
  width,
}: {
  name: string;
  characterId?: string;
  width?: string | number | undefined;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.HEX_CHARACTER,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { characterId },
  }));
  return (
    <div ref={drag}>
      <CharacterHexagon name={name} width={width} />
    </div>
  );
}
