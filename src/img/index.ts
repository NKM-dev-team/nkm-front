function importAll(r: __WebpackModuleApi.RequireContext) {
    let images: any = {};
    r.keys().map((item, _) => {
        return images[item
          .replace('./', '')
          .replace(/\.(png|jpe?g|svg)/, '')
          .toLowerCase()
          ] = r(item);
    });
    return images;
}

export const CHARACTER_HEXAGONS = importAll(require.context('./character_hexagons', false, /\.png/));
export const ABILITIES = importAll(require.context('./abilities', false, /\.(png|jpe?g|svg)/));
export const EFFECTS = importAll(require.context('./effects', false, /\.(png|jpe?g|svg)/));
export const STATS_IMG = importAll(require.context('./stats', false, /\.(png|jpe?g|svg)/));
