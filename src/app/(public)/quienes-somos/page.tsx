import Image from "next/image";
import { Target, Eye, Sparkles } from "lucide-react";
import { BrandLogos } from "@/components/brand/BrandLogos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Quiénes somos",
};

export default async function QuienesSomosPage() {
  const about = await prisma.aboutContent.findUnique({ where: { id: "default" } });

  if (!about) {
    return (
      <div className="section-container py-20 text-center text-muted">
        Contenido no disponible.
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-border bg-white py-16">
        <div className="section-container">
          <BrandLogos layout="footer" className="mb-8" />
          <SectionHeading
            align="left"
            eyebrow="Quiénes somos"
            title="Calidad y ahorro para tu hogar"
            description={about.description}
          />
        </div>
      </section>

      <section className="py-20">
        <div className="section-container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-ahorro-light to-white">
            {about.imageUrl && (
              <Image
                src={about.imageUrl}
                alt="Nuestra empresa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-ahorro" />
                <p className="text-sm font-medium">
                  Una propuesta renovada, cercana y pensada para el presente de tu familia.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-shadow rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ahorro-light text-ahorro">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-semibold">Visión</h2>
              <p className="mt-3 leading-relaxed text-muted">{about.vision}</p>
            </div>

            <div className="card-shadow rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-centro-light text-centro">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-semibold">Misión</h2>
              <p className="mt-3 leading-relaxed text-muted">{about.mission}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-ahorro via-[#8b1a42] to-centro py-16 text-white">
        <div className="section-container text-center">
          <BrandLogos layout="footer" variant="on-dark" className="mb-8 justify-center" />
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Dos marcas, un mismo compromiso
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Supermercados El Ahorro y Supermercados del Centro comparten campañas,
            valores y la convicción de servir mejor cada día a nuestras comunidades.
          </p>
        </div>
      </section>
    </div>
  );
}
