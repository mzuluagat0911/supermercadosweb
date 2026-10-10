"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollLeftOnPress = useRef(0);

  const last = Math.max(items.length - 1, 0);
  const current = Math.min(page, last);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollerRef.current;
    const slide = scroller?.querySelector<HTMLElement>(`[data-slide="${index}"]`);
    if (!scroller || !slide) return;
    const left = slide.offsetLeft - (scroller.clientWidth - slide.offsetWidth) / 2;
    scroller.scrollTo({ left, behavior });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (items.length === 0) return;
      const next = Math.max(0, Math.min(index, items.length - 1));
      setPage(next);
      scrollToIndex(next);
    },
    [items.length, scrollToIndex],
  );

  useEffect(() => {
    scrollToIndex(0, "auto");
  }, [items, scrollToIndex]);

  useEffect(() => {
    const rail = railRef.current;
    const thumb = thumbsRef.current[current];
    if (!rail || !thumb) return;
    const left = thumb.offsetLeft - (rail.clientWidth - thumb.offsetWidth) / 2;
    rail.scrollTo({ left, behavior: "smooth" });
  }, [current]);

  const syncPageFromScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const mid = scroller.scrollLeft + scroller.clientWidth / 2;
    let closest = 0;
    let best = Number.POSITIVE_INFINITY;
    scroller.querySelectorAll<HTMLElement>("[data-slide]").forEach((slide) => {
      const index = Number(slide.dataset.slide);
      const center = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - mid);
      if (distance < best) {
        best = distance;
        closest = index;
      }
    });
    setPage((prev) => (prev === closest ? prev : closest));
  }, []);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-20">
      <div className="section-container relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Separata"
            title="En octubre, déjate encantar"
            description="Del 9 al 12 de octubre. Pasa las páginas como en el periódico de ofertas."
          />
          <Link
            href="/donde-estamos"
            className="shrink-0 text-sm font-semibold text-ahorro transition hover:text-ahorro-dark"
          >
            Ver sucursales →
          </Link>
        </div>

        <div className="relative mt-10">
          <div
            ref={scrollerRef}
            onScroll={syncPageFromScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div aria-hidden className="w-[11%] shrink-0 sm:w-[max(11%,calc(50%-220px))]" />
            {items.map((slide, index) => {
              const active = index === current;
              return (
                <div
                  key={slide.id}
                  data-slide={index}
                  role="button"
                  tabIndex={0}
                  onPointerDown={() => {
                    scrollLeftOnPress.current = scrollerRef.current?.scrollLeft ?? 0;
                  }}
                  onClick={() => {
                    const moved = Math.abs((scrollerRef.current?.scrollLeft ?? 0) - scrollLeftOnPress.current) > 8;
                    if (moved) return;
                    if (!active) goTo(index);
                    else setZoom(index);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    if (!active) goTo(index);
                    else setZoom(index);
                  }}
                  className={`group relative aspect-[4/5] w-[78%] max-w-[440px] shrink-0 snap-center overflow-hidden rounded-[1.25rem] bg-white text-left shadow-[0_24px_60px_-28px_rgba(40,20,10,0.55)] ring-1 ring-black/10 transition ${
                    active ? "cursor-zoom-in" : "cursor-pointer opacity-80 hover:opacity-100"
                  }`}
                  aria-label={active ? `Abrir ${slide.title}` : `Ver ${slide.title}`}
                >
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 768px) 78vw, 440px"
                    className="object-contain"
                  />
                  {active && (
                    <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-foreground opacity-0 shadow-lg transition group-hover:opacity-100">
                      <ZoomIn className="h-4 w-4" />
                      Ver página
                    </span>
                  )}
                </div>
              );
            })}
            <div aria-hidden className="w-[11%] shrink-0 sm:w-[max(11%,calc(50%-220px))]" />
          </div>

          {current > 0 && (
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2.5 text-foreground shadow-lg ring-1 ring-black/5 transition hover:bg-[#fffdf8] sm:left-3 sm:block"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {current < last && (
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2.5 text-foreground shadow-lg ring-1 ring-black/5 transition hover:bg-[#fffdf8] sm:right-3 sm:block"
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-3 text-sm sm:mt-6 sm:flex-row">
          <div className="flex items-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="rounded-full bg-white p-2.5 text-foreground shadow-md ring-1 ring-black/5 disabled:opacity-40"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-wide text-muted ring-1 ring-black/5">
              {current + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current === last}
              className="rounded-full bg-white p-2.5 text-foreground shadow-md ring-1 ring-black/5 disabled:opacity-40"
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <p className="text-center font-display text-lg font-semibold">{item.title}</p>
          <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-wide text-muted ring-1 ring-black/5 sm:inline">
            Página {current + 1} de {items.length}
          </span>
        </div>
        <p className="mt-2 text-center text-xs text-muted sm:hidden">
          Desliza para pasar de página · toca para ampliar
        </p>

        <div ref={railRef} className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {items.map((thumb, index) => {
            const selected = index === current;
            return (
              <button
                key={thumb.id}
                ref={(node) => {
                  thumbsRef.current[index] = node;
                }}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ir a ${thumb.title}`}
                aria-current={selected ? "true" : undefined}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-white ring-2 transition ${
                  selected
                    ? "ring-ahorro shadow-md"
                    : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumb.imageUrl}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {zoom !== null && (
        <Lightbox
          items={items}
          index={zoom}
          onClose={() => setZoom(null)}
          onChange={(index) => {
            setZoom(index);
            setPage(index);
          }}
        />
      )}
    </section>
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

      <div className="relative z-10 flex max-h-[min(92vh,1080px)] w-full max-w-[min(92vw,520px)] flex-col">
        <div className="mb-3 flex items-center justify-between gap-3 text-white">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold sm:text-xl">{item.title}</p>
            <p className="text-xs text-white/60">
              Página {index + 1} de {items.length}
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

        <div className="relative overflow-hidden rounded-2xl bg-[#111] shadow-2xl ring-1 ring-white/10">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              priority
              sizes="520px"
              className="object-contain"
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
