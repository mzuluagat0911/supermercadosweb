"use client";

import { useEffect, useState } from "react";
import { Download, Mail, Phone } from "lucide-react";
import type { HrApplication } from "@/generated/prisma/client";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  REVIEWED: "Revisada",
  CONTACTED: "Contactada",
  REJECTED: "Rechazada",
};

export function RrhhManager() {
  const [applications, setApplications] = useState<HrApplication[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadApplications() {
    const response = await fetch("/api/admin/rrhh");
    setApplications(await response.json());
    setLoading(false);
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/rrhh/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadApplications();
  }

  if (loading) {
    return <p className="text-sm text-muted">Cargando postulaciones...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold">Postulaciones RRHH</h2>
        <p className="mt-1 text-sm text-muted">
          Revisa las hojas de vida enviadas desde el formulario público.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted">
          Aún no hay postulaciones registradas.
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <article
              key={app.id}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{app.fullName}</h3>
                  <p className="mt-1 text-sm text-muted">Área: {app.area}</p>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(app.createdAt).toLocaleString("es-CO")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <a
                      href={`mailto:${app.email}`}
                      className="inline-flex items-center gap-1.5 text-ahorro hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {app.email}
                    </a>
                    <a
                      href={`tel:${app.phone}`}
                      className="inline-flex items-center gap-1.5 text-ahorro hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {app.phone}
                    </a>
                  </div>

                  {app.message && (
                    <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-foreground/80">
                      {app.message}
                    </p>
                  )}

                  {app.cvUrl && (
                    <a
                      href={app.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-centro-light px-4 py-2.5 text-sm font-semibold text-centro-dark transition hover:bg-centro-light/80"
                    >
                      <Download className="h-4 w-4" />
                      Descargar hoja de vida ({app.cvFileName ?? "CV"})
                    </a>
                  )}
                </div>

                <div className="shrink-0">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                    Estado
                  </label>
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="rounded-xl border border-border px-4 py-2.5 text-sm"
                  >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
