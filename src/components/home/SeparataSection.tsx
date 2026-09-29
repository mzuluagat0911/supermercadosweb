"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn } from "lucide-react";
import type { SeparataItem } from "@/generated/prisma/client";
import { SectionHeading } from "@/components/ui/SectionHeading";

type SeparataSectionProps = {
  items: SeparataItem[];
};

export function SeparataSection({ items }: SeparataSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  const [featured, ...rest] = items;
  const showBento = items.length >= 3;

  function openAt(id: string) {
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) setActiveIndex(index);
  }

  return (
    <section className="relative overflow-hidden bg-[#faf8f5] py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(227,27,35,0.08), transparent 42%), radial-gradient(circle at 88% 70%, rgba(26,159,66,0.1), transparent 40%)",
        }}
      />

      <div className="section-container relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Separata"
            title="Ofertas para hacer tu mercado"
            description="Descuentos de la temporada listos para aprovechar en tu sucursal más cercana."
          />
          <Link
            href="/donde-estamos"
            className="shrink-0 text-sm font-semibold text-ahorro transition hover:text-ahorro-dark"
          >
            Ver sucursales →
          </Link>
        </div>

        {showBento ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              item={featured}
              featured
              priority
              className="lg:col-span-2 lg:row-span-2"
              onOpen={() => openAt(featured.id)}
            />
            {rest.slice(0, 4).map((item, index) => (
              <Card
                key={item.id}
                item={item}
                priority={index < 2}
                onOpen={() => openAt(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="-mx-4 mt-12 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {items.map((item, index) => (
              <Card
                key={item.id}
                item={item}
                priority={index < 2}
                className="w-[78vw] shrink-0 snap-center sm:w-auto"
                onOpen={() => openAt(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <Lightbox
          items={items}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      )}
    </section>
  );
}

function Card({
  item,
  className = "",
  priority = false,
  featured = false,
  onOpen,
}: {
  item: SeparataItem;
  className?: string;
  priority?: boolean;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver ${item.title} en detalle`}
      className={`block w-full cursor-zoom-in text-left ${className}`}
    >
      <article
        className={`group relative aspect-square overflow-hidden rounded-[1.35rem] bg-white shadow-[0_18px_50px_-28px_rgba(40,20,10,0.45)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(40,20,10,0.55)] ${
          featured ? "lg:aspect-auto lg:h-full lg:min-h-[32rem]" : ""
        }`}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          priority={priority}
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 80vw, 25vw"}
          className="object-contain bg-[#071433] transition duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg">
            <ZoomIn className="h-4 w-4" />
            Ver detalle
          </span>
        </div>
      </article>
    </button>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: SeparataItem[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onChange(index - 1);
  }, [hasPrev, index, onChange]);

  const goNext = useCallback(() => {
    if (hasNext) onChange(index + 1);
  }, [hasNext, index, onChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrev, onClose]);

  if (!mounted || !item) return null;

  const external = item.link?.startsWith("http");

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
    >
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[min(92vh,1080px)] w-full max-w-[min(92vw,900px)] flex-col">
        <div className="mb-3 flex items-center justify-between gap-3 text-white">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold sm:text-xl">
              {item.title}
            </p>
            <p className="text-xs text-white/60">
              {index + 1} / {items.length}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
          <div className="relative aspect-square w-full">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 900px) 92vw, 900px"
              className="object-contain bg-black"
            />
          </div>

          {hasPrev && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-foreground shadow-lg transition hover:bg-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-foreground shadow-lg transition hover:bg-white"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {item.link ? (
          <div className="mt-4 flex justify-center">
            <Link
              href={item.link}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-ahorro px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-ahorro-dark"
            >
              Ir a la oferta
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
