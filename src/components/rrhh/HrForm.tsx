"use client";

import { useState } from "react";
import { Send, Upload, CheckCircle2 } from "lucide-react";
import type { HrArea } from "@/generated/prisma/client";

type HrFormProps = {
  areas: HrArea[];
};

export function HrForm({ areas }: HrFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/hr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "No se pudo enviar la solicitud.");
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="card-shadow rounded-2xl border border-ahorro/20 bg-ahorro-light p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-ahorro" />
        <h3 className="mt-4 text-xl font-semibold">¡Solicitud enviada!</h3>
        <p className="mt-2 text-muted">
          Hemos recibido tu información. Nuestro equipo de RRHH se pondrá en contacto contigo.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-semibold text-ahorro hover:underline"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-shadow rounded-2xl border border-border bg-card p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
            Nombre completo *
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-ahorro focus:ring-2 focus:ring-ahorro/20"
            placeholder="Tu nombre y apellido"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Número de contacto *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-ahorro focus:ring-2 focus:ring-ahorro/20"
            placeholder="+57 300 000 0000"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Correo electrónico *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-ahorro focus:ring-2 focus:ring-ahorro/20"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="area" className="mb-2 block text-sm font-medium">
            ¿Área a la que aplica? *
          </label>
          <select
            id="area"
            name="area"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-ahorro focus:ring-2 focus:ring-ahorro/20"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona un área
            </option>
            {areas.map((area) => (
              <option key={area.id} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cv" className="mb-2 block text-sm font-medium">
            Adjuntar CV
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-6 transition hover:border-ahorro/50 hover:bg-ahorro-light/30">
            <Upload className="h-5 w-5 text-muted" />
            <div>
              <p className="text-sm font-medium">Seleccionar archivo PDF o Word</p>
              <p className="text-xs text-muted">Máximo 5 MB</p>
            </div>
            <input
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
            />
          </label>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Tu mensaje (opcional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-ahorro focus:ring-2 focus:ring-ahorro/20"
            placeholder="Cuéntanos brevemente sobre tu experiencia o interés..."
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ahorro px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-ahorro-dark disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
