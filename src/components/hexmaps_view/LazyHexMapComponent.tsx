import React from "react";
import { HexMapTemplate } from "../../types/game/hex/HexMapTemplate";

import { MemoizedHexMapComponent } from "./HexMapComponent";
import { HexCellTemplate } from "../../types/game/hex/HexCellTemplate";

interface LazyHexMapComponentProps {
  scale?: number;
  hexMap: HexMapTemplate;
  onHexagonClick?: (c: HexCellTemplate) => void;
}

const LazyHexMapComponent: React.FC<LazyHexMapComponentProps> = ({
  scale = 1,
  hexMap,
  onHexagonClick,
}) => {
  return (
    <MemoizedHexMapComponent
      scale={scale}
      hexMap={hexMap}
      onHexagonClick={onHexagonClick}
    />
  );
};

export default LazyHexMapComponent;
