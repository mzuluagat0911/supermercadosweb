"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { SeparataItem } from "@/generated/prisma/client";

const EMPTY_FORM = {
  title: "",
  link: "",
  sortOrder: 0,
  active: true,
};

export function SeparataManager() {
  const [items, setItems] = useState<SeparataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadItems() {
    const response = await fetch("/api/admin/separata");
    const data = await response.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function resetForm() {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function startEdit(item: SeparataItem) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      link: item.link ?? "",
      sortOrder: item.sortOrder,
      active: item.active,
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
      formData.append(key, String(value));
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const url = editingId ? `/api/admin/separata/${editingId}` : "/api/admin/separata";
    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, { method, body: formData });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setError(data.error ?? "No se pudo guardar.");
      return;
    }

    await loadItems();
    resetForm();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta imagen de la separata?")) return;

    const response = await fetch(`/api/admin/separata/${id}`, { method: "DELETE" });
    if (response.ok) {
      await loadItems();
      if (editingId === id) resetForm();
    }
  }

  if (loading) {
    return <p className="text-sm text-muted">Cargando separata...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold">Separata de ofertas</h2>
          <p className="mt-1 text-sm text-muted">
            Sube imágenes cuadradas 1080×1080 con los descuentos de la semana.
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
          Nueva imagen
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-white p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold">
            {editingId ? "Editar imagen" : "Subir imagen"}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium">Título</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Ej. Vinos seleccionados"
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none ring-ahorro/30 focus:ring-2"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Link (opcional)</label>
              <input
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="/donde-estamos o WhatsApp"
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none ring-ahorro/30 focus:ring-2"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Orden</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none ring-ahorro/30 focus:ring-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium">
              Imagen 1080×1080 {editingId ? "(dejar vacío para mantener la actual)" : "*"}
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm"
              required={!editingId}
            />
            <p className="mt-1.5 text-xs text-muted">
              Formato recomendado: JPG o PNG cuadrado (1080×1080), máximo 5 MB.
            </p>
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          >
            <div className="relative aspect-square bg-gray-100">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.active ? "Activo" : "Inactivo"}
                  </span>
                  <span className="text-xs text-muted">Orden {item.sortOrder}</span>
                </div>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                {item.link && (
                  <p className="mt-1 truncate text-xs text-muted">{item.link}</p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-xl border border-border p-2.5 hover:bg-gray-50"
                  aria-label="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-xl border border-border p-2.5 text-red-600 hover:bg-red-50"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
