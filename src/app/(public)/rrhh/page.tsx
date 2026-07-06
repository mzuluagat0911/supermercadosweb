import { HrForm } from "@/components/rrhh/HrForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "RRHH",
};

export default async function RrhhPage() {
  const areas = await prisma.hrArea.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <section className="border-b border-border bg-white py-16">
        <div className="section-container">
          <SectionHeading
            align="left"
            eyebrow="Recursos Humanos"
            title="Trabaja con nosotros"
            description="¿Quieres hacer parte de nuestro equipo? Completa el formulario y cuéntanos en qué área te gustaría aplicar. Estamos en constante búsqueda de talento comprometido con el servicio y la calidad."
          />
        </div>
      </section>

      <section className="section-container py-16">
        <div className="mx-auto max-w-3xl">
          <HrForm areas={areas} />
        </div>
      </section>
    </div>
  );
}
