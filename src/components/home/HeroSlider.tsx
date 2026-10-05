"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/generated/prisma/client";

const GRADIENTS = ["hero-gradient-1", "hero-gradient-2", "hero-gradient-3"];

type HeroSliderProps = {
  banners: Banner[];
};

export function HeroSlider({ banners }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [banners.length, next]);

  if (banners.length === 0) return null;

  const banner = banners[current];
  const gradient = GRADIENTS[current % GRADIENTS.length];
  const isArtwork = /\.(png|jpe?g|webp)$/i.test(banner.imageUrl);
  const isPortrait = banner.imageUrl.includes("/images/separata/");

  return (
    <section className="relative overflow-hidden">
      {isArtwork && isPortrait ? (
        <div key={banner.id} className="flex justify-center bg-white px-4 py-6 sm:px-8">
          <Image
            src={banner.imageUrl}
            alt={banner.title}
            width={837}
            height={1024}
            priority
            sizes="(max-width: 768px) 100vw, 720px"
            className="h-auto max-h-[82vh] w-auto max-w-full rounded-2xl shadow-[0_18px_50px_-28px_rgba(40,20,10,0.45)]"
          />
        </div>
      ) : isArtwork ? (
        <div key={banner.id} className="w-full bg-[#071433]">
          <Image
            src={banner.imageUrl}
            alt={banner.title}
            width={1024}
            height={320}
            priority
            sizes="100vw"
            className="h-auto w-full"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ) : (
      <div className={`relative min-h-[520px] ${gradient}`}>
        <div className="absolute inset-0 opacity-20">
          <Image
            src={banner.imageUrl}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />

        <div className="section-container relative flex min-h-[520px] items-center py-16">
          <div key={banner.id} className="max-w-2xl animate-slide-in text-white">
            {banner.tag && (
              <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                {banner.tag}
              </span>
            )}
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {banner.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/95 sm:text-xl">
              {banner.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {banner.ctaLink &&
                (banner.ctaLink.startsWith("http") ? (
                  <a
                    href={banner.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    {banner.ctaText}
                  </a>
                ) : (
                  <Link
                    href={banner.ctaLink}
                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    {banner.ctaText}
                  </Link>
                ))}
              <Link
                href="/donde-estamos"
                className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                Pedir por WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
      )}

        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-foreground shadow-md transition hover:bg-white/90"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-foreground shadow-md transition hover:bg-white/90"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? "w-8 bg-foreground" : "w-2 bg-foreground/30"
                  }`}
                  aria-label={`Ir al banner ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
    </section>
  );
}
