"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Banner } from "@/generated/prisma/client";

const EMPTY_FORM = {
  tag: "",
  title: "",
  body: "",
  ctaText: "",
  ctaLink: "",
  ctaType: "LINK",
  sortOrder: 0,
  active: true,
};

export function BannersManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadBanners() {
    const response = await fetch("/api/admin/banners");
    const data = await response.json();
    setBanners(data);
    setLoading(false);
  }

  useEffect(() => {
    loadBanners();
  }, []);

  function resetForm() {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function startEdit(banner: Banner) {
    setEditingId(banner.id);
    setForm({
      tag: banner.tag ?? "",
      title: banner.title,
      body: banner.body,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink ?? "",
      ctaType: banner.ctaType,
      sortOrder: banner.sortOrder,
      active: banner.active,
    });
    setImageFile(null);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "active") {
        formData.append(key, String(value));
      } else {
        formData.append(key, String(value));
      }
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const url = editingId ? `/api/admin/banners/${editingId}` : "/api/admin/banners";
    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, { method, body: formData });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setError(data.error ?? "No se pudo guardar.");
      return;
    }

    await loadBanners();
    resetForm();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este banner?")) return;

    const response = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    if (response.ok) {
      await loadBanners();
      if (editingId === id) resetForm();
    }
  }

  if (loading) {
    return <p className="text-sm text-muted">Cargando banners...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold">Banners principales</h2>
          <p className="mt-1 text-sm text-muted">
            Sube las imágenes del slider de la home (Quincenazo, Trasnochón, etc.).
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-ahorro px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Nuevo banner
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-white p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold">
            {editingId ? "Editar banner" : "Crear banner"}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Etiqueta (opcional)" value={form.tag} onChange={(v) => setForm({ ...form, tag: v })} />
            <Field label="Orden" type="number" value={String(form.sortOrder)} onChange={(v) => setForm({ ...form, sortOrder: Number(v) })} />
            <Field label="Título" value={form.title} onChange={(v) => setForm({ ...form, title: v })} className="md:col-span-2" required />
            <Field label="Descripción" value={form.body} onChange={(v) => setForm({ ...form, body: v })} className="md:col-span-2" multiline required />
            <Field label="Texto del botón" value={form.ctaText} onChange={(v) => setForm({ ...form, ctaText: v })} required />
            <Field label="Link del botón" value={form.ctaLink} onChange={(v) => setForm({ ...form, ctaLink: v })} />
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium">
              Imagen del banner {editingId ? "(dejar vacío para mantener la actual)" : "*"}
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm"
              required={!editingId}
            />
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Visible en el sitio
          </label>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-ahorro px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {banners.map((banner) => (
          <article
            key={banner.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-44">
              <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {banner.tag && (
                  <span className="rounded-full bg-ahorro-light px-2.5 py-1 text-xs font-semibold text-ahorro">
                    {banner.tag}
                  </span>
                )}
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    banner.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {banner.active ? "Activo" : "Inactivo"}
                </span>
              </div>
              <h3 className="mt-2 font-semibold">{banner.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{banner.body}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(banner)}
                className="rounded-xl border border-border p-2.5 hover:bg-gray-50"
                aria-label="Editar"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(banner.id)}
                className="rounded-xl border border-border p-2.5 text-red-600 hover:bg-red-50"
                aria-label="Eliminar"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  multiline = false,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          required={required}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none ring-ahorro/30 focus:ring-2"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none ring-ahorro/30 focus:ring-2"
        />
      )}
    </div>
  );
}
