import Link from "next/link";
import { Truck, MessageCircle, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DomiciliosSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#fff7f5] py-20">
      <div className="section-container">
        <SectionHeading
          eyebrow="Domicilios"
          title="Haz tu pedido sin salir de casa"
          description="Elige tu sucursal más cercana y realiza tu pedido directamente por WhatsApp. Cada punto de venta atiende sus pedidos de forma directa para brindarte la mejor experiencia."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="card-shadow rounded-2xl border border-ahorro/15 bg-card p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ahorro-light text-ahorro">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">1. Elige tu sucursal</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Consulta nuestras 5 sedes y selecciona la más cercana a tu ubicación.
            </p>
          </div>

          <div className="card-shadow rounded-2xl border border-centro/15 bg-card p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ahorro-light text-ahorro">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">2. Escríbenos por WhatsApp</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Cuéntanos qué necesitas y te confirmamos disponibilidad y tiempos de entrega.
            </p>
          </div>

          <div className="card-shadow rounded-2xl border border-centro-orange/20 bg-card p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ahorro-light text-ahorro">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">3. Recibe en tu hogar</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Tu sucursal coordina el domicilio contigo con la frescura que nos caracteriza.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/donde-estamos"
            className="inline-flex rounded-full bg-ahorro px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-ahorro-dark"
          >
            Ver sucursales y pedir
          </Link>
        </div>
      </div>
    </section>
  );
}
