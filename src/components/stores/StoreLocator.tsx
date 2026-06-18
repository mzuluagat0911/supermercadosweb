"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreAddressLink } from "@/components/stores/StoreAddressLink";
import { BRAND_LABELS } from "@/lib/constants";
import { formatPhoneLink, formatWhatsAppLink } from "@/lib/format";
import type { Store } from "@/generated/prisma/client";

const StoreMap = dynamic(() => import("./StoreMap").then((m) => m.StoreMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] items-center justify-center rounded-2xl bg-gray-100 text-sm text-muted">
      Cargando mapa...
    </div>
  ),
});

type StoreLocatorProps = {
  stores: Store[];
};

export function StoreLocator({ stores }: StoreLocatorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(stores[0]?.id ?? null);
  const selected = stores.find((s) => s.id === selectedId) ?? stores[0];

  useEffect(() => {
    if (!selectedId && stores[0]) {
      setSelectedId(stores[0].id);
    }
  }, [selectedId, stores]);

  const elAhorro = stores.filter((s) => s.brand === "EL_AHORRO");
  const delCentro = stores.filter((s) => s.brand === "DEL_CENTRO");

  return (
    <div className="section-container py-16">
      <SectionHeading
        eyebrow="Ubicaciones"
        title="¡Encuentra tu sucursal más cercana!"
        description="Explora el mapa interactivo o consulta el listado de sedes para hacer tu pedido directamente con la tienda de tu preferencia."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <StoreMap stores={stores} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className="lg:col-span-2">
          {selected && (
            <div className="card-shadow rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ahorro">
                Sucursal seleccionada
              </p>
              <h3 className="mt-2 text-xl font-semibold">{selected.name}</h3>
              <p className="mt-1 text-sm text-muted">{BRAND_LABELS[selected.brand]}</p>
              <StoreAddressLink store={selected} className="mt-4 flex items-start gap-2 text-sm text-muted transition hover:text-ahorro" />
              <a
                href={formatPhoneLink(selected.phone)}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium transition hover:text-ahorro"
              >
                <Phone className="h-4 w-4" />
                {selected.phone}
              </a>
              {selected.mapsUrl && (
                <a
                  href={selected.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-centro transition hover:text-centro-dark"
                >
                  Abrir en Google Maps
                </a>
              )}
              <a
                href={formatWhatsAppLink(selected.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
              >
                Haz tu pedido
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <StoreGroup
          title={BRAND_LABELS.EL_AHORRO}
          stores={elAhorro}
          accent="border-ahorro"
          onSelect={setSelectedId}
        />
        <StoreGroup
          title={BRAND_LABELS.DEL_CENTRO}
          stores={delCentro}
          accent="border-centro-orange"
          onSelect={setSelectedId}
        />
      </div>
    </div>
  );
}

function StoreGroup({
  title,
  stores,
  accent,
  onSelect,
}: {
  title: string;
  stores: Store[];
  accent: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h3 className={`border-l-4 pl-4 text-xl font-semibold ${accent}`}>{title}</h3>
      <ul className="mt-6 space-y-4">
        {stores.map((store) => (
          <li
            key={store.id}
            className="card-shadow rounded-2xl border border-border bg-card p-5 transition hover:border-ahorro/30"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{store.name}</p>
                <StoreAddressLink store={store} />
                <a
                  href={formatPhoneLink(store.phone)}
                  className="mt-2 inline-flex items-center gap-2 text-sm transition hover:text-ahorro"
                >
                  <Phone className="h-4 w-4" />
                  {store.phone}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onSelect(store.id)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:bg-gray-50"
                >
                  Ver en mapa
                </button>
                {store.mapsUrl && (
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:bg-gray-50"
                  >
                    Google Maps
                  </a>
                )}
                <a
                  href={formatWhatsAppLink(store.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#1ebe57]"
                >
                  Haz tu pedido
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
