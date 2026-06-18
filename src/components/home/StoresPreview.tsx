import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BRAND_LABELS } from "@/lib/constants";
import { formatWhatsAppLink } from "@/lib/format";
import type { Store } from "@/generated/prisma/client";

type StoresPreviewProps = {
  stores: Store[];
};

export function StoresPreview({ stores }: StoresPreviewProps) {
  return (
    <section className="bg-white py-20">
      <div className="section-container">
        <SectionHeading
          eyebrow="Nuestras tiendas"
          title="Siempre cerca de ti"
          description="Conoce nuestras sedes de Supermercados El Ahorro y Supermercados del Centro."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <article
              key={store.id}
              className="card-shadow group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-centro-orange/30"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {store.imageUrl && (
                  <Image
                    src={store.imageUrl}
                    alt={store.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute left-4 top-4 rounded-xl bg-white/80 px-2 py-1 backdrop-blur-sm">
                  <BrandLogo brand={store.brand} layout="inline" variant="card" />
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {BRAND_LABELS[store.brand]}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{store.name}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {store.address}
                </p>
                <div className="mt-5 flex gap-2">
                  <a
                    href={formatWhatsAppLink(store.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-full bg-[#25D366] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
                  >
                    Haz tu pedido
                  </a>
                  <Link
                    href="/donde-estamos"
                    className="rounded-full border border-border px-4 py-2.5 text-sm font-medium transition hover:border-centro-orange/35 hover:bg-gray-50"
                  >
                    Ver mapa
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
