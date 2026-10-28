import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";

const CONTACT_WHATSAPP = "573163010885";
const CONTACT_EMAIL = "gestion.elahorro@gmail.com";

const OPENINGS = [
  {
    id: "auxiliar-carnes",
    title: "Auxiliar de carnes",
    brand: "Supermercados El Ahorro",
    imageUrl: "/images/empleos/auxiliar-carnes-el-ahorro.jpg",
    salary: "$1.895.850 + auxilio de transporte + bono de alimentación de $100.000",
    details: [
      "Lunes a domingo, 1 día de descanso a la semana",
      "Turnos rotativos de 7 horas entre 7:00 a.m. y 8:00 p.m.",
      "Labores de carnicería, cortes y manejo de herramientas",
    ],
  },
  {
    id: "auxiliar-bodega",
    title: "Auxiliar de bodega",
    brand: "Supermercado Del Centro",
    imageUrl: "/images/empleos/auxiliar-bodega-del-centro.jpg",
    salary: "$1.750.905 + auxilio de transporte",
    details: [
      "Lunes a domingo, 1 día de descanso a la semana",
      "Turnos rotativos de 7 horas entre 7:00 a.m. y 8:00 p.m.",
      "Experiencia como auxiliar de bodega en supermercado",
    ],
  },
];

export function JobOpenings() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {OPENINGS.map((job) => {
        const message = encodeURIComponent(
          `Hola, quiero postularme a la vacante de ${job.title} en ${job.brand}.`,
        );
        const subject = encodeURIComponent(`Postulación: ${job.title} - ${job.brand}`);

        return (
          <article
            key={job.id}
            className="card-shadow flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
          >
            <a
              href={job.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[3/4] bg-gray-50"
              aria-label={`Ver afiche de ${job.title}`}
            >
              <Image
                src={job.imageUrl}
                alt={`Vacante ${job.title} - ${job.brand}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </a>

            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{job.brand}</p>
              <h3 className="mt-1 text-xl font-semibold">{job.title}</h3>
              <p className="mt-2 text-sm font-semibold text-ahorro">{job.salary}</p>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {job.details.map((detail) => (
                  <li key={detail}>• {detail}</li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <a
                  href={`https://wa.me/${CONTACT_WHATSAPP}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Postularme por WhatsApp
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${subject}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
                >
                  <Mail className="h-4 w-4" />
                  Enviar hoja de vida
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
