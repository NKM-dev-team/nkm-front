function importAll(r: __WebpackModuleApi.RequireContext) {
    let images: any = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '').replace('.png', '')] = r(item).default;
    });
    return images;
}
const CHARACTER_HEXAGONS = importAll(require.context('./character_hexagons', false, /\.png/));

export default CHARACTER_HEXAGONS;