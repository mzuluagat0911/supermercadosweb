type PinBrand = "EL_AHORRO" | "DEL_CENTRO";

const BRAND_COLORS = {
  EL_AHORRO: { main: "#e31b23", dark: "#b8141b" },
  DEL_CENTRO: { main: "#1a9f42", dark: "#0f7a32" },
} as const;

const BAG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;

const PIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

export function createMapPinHtml(
  brand: PinBrand,
  selected: boolean,
  label?: string,
): string {
  const { main, dark } = BRAND_COLORS[brand];
  const size = selected ? 52 : 44;
  const icon = brand === "EL_AHORRO" ? BAG_ICON : PIN_ICON;
  const labelHtml = selected && label
    ? `<div style="margin-bottom:6px;padding:6px 12px;background:#fff;border-radius:8px;font-size:11px;font-weight:700;color:#1a1f16;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.15);border:1px solid rgba(0,0,0,.06)">${label}</div>`
    : "";

  return `
    <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;transform:${selected ? "scale(1.1)" : "scale(1)"};transition:transform .2s">
      ${labelHtml}
      <div style="width:${size}px;height:${size}px;border-radius:50%;border:3px solid #fff;background:linear-gradient(145deg,${main},${dark});box-shadow:0 8px 24px rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;${selected ? "outline:4px solid rgba(255,255,255,.45)" : ""}">
        ${icon}
      </div>
      <svg width="26" height="11" viewBox="0 0 26 11" style="margin-top:-2px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.2))">
        <path d="M13 11 L0 0 L26 0 Z" fill="${dark}"/>
      </svg>
    </div>
  `;
}

export function getStoresCenter(stores: { latitude: number; longitude: number }[]) {
  if (stores.length === 0) return { lat: 5.045, lng: -75.5 };
  return {
    lat: stores.reduce((s, x) => s + x.latitude, 0) / stores.length,
    lng: stores.reduce((s, x) => s + x.longitude, 0) / stores.length,
  };
}
