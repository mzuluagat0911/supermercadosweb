"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, ChevronRight } from "lucide-react";
import { BRAND_LABELS, WHATSAPP_MESSAGE } from "@/lib/constants";
import { formatWhatsAppLink } from "@/lib/format";
import type { Store } from "@/generated/prisma/client";

type WhatsAppFloatProps = {
  stores: Store[];
};

export function WhatsAppFloat({ stores }: WhatsAppFloatProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const elAhorro = stores.filter((s) => s.brand === "EL_AHORRO");
  const delCentro = stores.filter((s) => s.brand === "DEL_CENTRO");

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-fade-up w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#25D366] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Elige tu sucursal para pedir</p>
              <p className="text-xs text-white/85">Te conectamos por WhatsApp</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 transition hover:bg-white/20"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            <StoreGroup
              title={BRAND_LABELS.EL_AHORRO}
              stores={elAhorro}
              accent="text-ahorro"
            />
            <StoreGroup
              title={BRAND_LABELS.DEL_CENTRO}
              stores={delCentro}
              accent="text-centro-orange"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 text-white shadow-lg transition hover:scale-[1.02] hover:bg-[#1ebe57]"
        aria-expanded={open}
        aria-label="Abrir menú de WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden text-sm font-semibold sm:inline">Pedir por WhatsApp</span>
      </button>
    </div>
  );
}

function StoreGroup({
  title,
  stores,
  accent,
}: {
  title: string;
  stores: Store[];
  accent: string;
}) {
  if (stores.length === 0) return null;

  return (
    <div className="mb-2">
      <p className={`px-3 py-2 text-xs font-bold uppercase tracking-wider ${accent}`}>
        {title}
      </p>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <a
              href={formatWhatsAppLink(store.whatsapp, WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-foreground">{store.name}</p>
                <p className="text-xs text-muted">{store.address}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
