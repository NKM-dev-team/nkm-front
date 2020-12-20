import { Hexagon, HexGrid, Layout } from "../../react-hexgrid";
import { HexMap } from "../../features/hexMapSlice";
import { HexCell } from "../../features/hexMapSlice";
import "./index.sass";

export default function HexMapComponent({ hexMap }: { hexMap: HexMap }) {
  let cells = hexMap.cells;
  const originX =
    -cells.map((c: HexCell) => c.coordinates.x).reduce((a, b) => a + b, 0) /
    cells.length;
  const originY =
    -cells.map((c: HexCell) => c.coordinates.y).reduce((a, b) => a + b, 0) /
    cells.length;
  return (
    <HexGrid width={800} height={800} viewBox="-50 -50 100 100">
      <Layout
        size={{ x: 1, y: 1 }}
        flat={true}
        spacing={1}
        origin={{ x: originX, y: originY }}
      >
        {cells.map((c, i) => (
          <Hexagon
            className={"hex-" + c.cellType.toLowerCase()}
            key={i}
            q={c.coordinates.x}
            r={c.coordinates.y}
            s={c.coordinates.z}
          />
        ))}
      </Layout>
    </HexGrid>
  );
}
