"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { PromoTickerItem } from "@/generated/prisma/client";

const EMPTY = { emoji: "🛒", text: "", href: "", sortOrder: 0, active: true };

export function TickerManager() {
  const [items, setItems] = useState<PromoTickerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadItems() {
    const response = await fetch("/api/admin/ticker");
    setItems(await response.json());
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function resetForm() {
    setForm(EMPTY);
    setEditingId(null);
    setError("");
  }

  function startEdit(item: PromoTickerItem) {
    setEditingId(item.id);
    setForm({
      emoji: item.emoji,
      text: item.text,
      href: item.href ?? "",
      sortOrder: item.sortOrder,
      active: item.active,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      href: form.href || null,
    };

    const url = editingId ? `/api/admin/ticker/${editingId}` : "/api/admin/ticker";
    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

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
    if (!confirm("¿Eliminar este mensaje?")) return;
    await fetch(`/api/admin/ticker/${id}`, { method: "DELETE" });
    await loadItems();
    if (editingId === id) resetForm();
  }

  if (loading) {
    return <p className="text-sm text-muted">Cargando mensajes...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold">Franja de promos</h2>
        <p className="mt-1 text-sm text-muted">
          Edita los textos que se mueven debajo del banner principal en la home.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(90deg,#00c6ff_0%,#0072ff_28%,#7b2ff7_62%,#f107a3_100%)]">
        <div className="flex h-10 items-center px-4 text-sm font-semibold text-white sm:h-11">
          Vista previa: {form.emoji} {form.text || "Tu mensaje aquí"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">
          {editingId ? "Editar mensaje" : "Nuevo mensaje"}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Emoji</label>
            <input
              value={form.emoji}
              onChange={(e) => setForm({ ...form, emoji: e.target.value })}
              className="w-full rounded-xl border border-border px-4 py-3 text-sm"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Orden</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              className="w-full rounded-xl border border-border px-4 py-3 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">Texto *</label>
            <input
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="w-full rounded-xl border border-border px-4 py-3 text-sm"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">Link (opcional)</label>
            <input
              value={form.href}
              onChange={(e) => setForm({ ...form, href: e.target.value })}
              placeholder="/donde-estamos"
              className="w-full rounded-xl border border-border px-4 py-3 text-sm"
            />
          </div>
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
            className="inline-flex items-center gap-2 rounded-xl bg-ahorro px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saving ? "Guardando..." : editingId ? "Actualizar" : "Agregar"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold">
                {item.emoji} {item.text}
              </p>
              <p className="mt-1 text-xs text-muted">
                Orden {item.sortOrder}
                {item.href ? ` · ${item.href}` : ""}
                {" · "}
                {item.active ? "Activo" : "Inactivo"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(item)}
                className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="rounded-xl border border-border p-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
