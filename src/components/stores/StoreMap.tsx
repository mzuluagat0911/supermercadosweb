"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Store } from "@/generated/prisma/client";
import { BRAND_LABELS } from "@/lib/constants";
import { createMapPinHtml, getStoresCenter } from "@/lib/map-pins";
import { formatWhatsAppLink } from "@/lib/format";
import "leaflet/dist/leaflet.css";

function MapController({
  selectedId,
  stores,
}: {
  selectedId: string | null;
  stores: Store[];
}) {
  const map = useMap();
  const selected = stores.find((s) => s.id === selectedId);

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.latitude, selected.longitude], 15, { duration: 0.8 });
    }
  }, [selected, map]);

  return null;
}

type StoreMapProps = {
  stores: Store[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function StoreMap({ stores, selectedId, onSelect }: StoreMapProps) {
  const center = getStoresCenter(stores);
  const icons = useMemo(() => {
    const cache = new Map<string, L.DivIcon>();

    for (const store of stores) {
      const selected = store.id === selectedId;
      const key = `${store.id}-${selected}`;
      cache.set(
        key,
        L.divIcon({
          className: "",
          html: createMapPinHtml(
            store.brand,
            selected,
            selected ? store.name : undefined,
          ),
          iconSize: selected ? [160, 90] : [52, 70],
          iconAnchor: selected ? [80, 82] : [26, 68],
        }),
      );
    }
    return cache;
  }, [stores, selectedId]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-md">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[460px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapController selectedId={selectedId} stores={stores} />
        {stores.map((store) => {
          const selected = store.id === selectedId;
          const iconKey = `${store.id}-${selected}`;

          return (
            <Marker
              key={store.id}
              position={[store.latitude, store.longitude]}
              icon={icons.get(iconKey)!}
              eventHandlers={{ click: () => onSelect(store.id) }}
              zIndexOffset={selected ? 1000 : 0}
            >
              <Popup className="store-popup">
                <div className="min-w-[180px] text-sm">
                  <p className="font-semibold text-foreground">{store.name}</p>
                  <p className="text-xs text-muted">{BRAND_LABELS[store.brand]}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {store.address}
                  </p>
                  <a
                    href={formatWhatsAppLink(store.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-semibold text-[#128C7E] hover:underline"
                  >
                    Pedir por WhatsApp
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
