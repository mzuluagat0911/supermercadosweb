/** Teselas públicas de OpenStreetMap. No requieren API key. */
export const OSM_TILES = {
  url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19,
} as const;
