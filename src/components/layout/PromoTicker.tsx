"use client";

import Link from "next/link";
import type { PromoTickerItem } from "@/generated/prisma/client";

type PromoTickerProps = {
  items: Pick<PromoTickerItem, "emoji" | "text" | "href">[];
};

function TickerSegment({
  items,
  hidden = false,
}: PromoTickerProps & { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, index) => {
        const content = (
          <>
            <span aria-hidden="true">{item.emoji}</span>
            <span>{item.text}</span>
          </>
        );

        if (item.href) {
          return (
            <Link
              key={`${item.text}-${index}`}
              href={item.href}
              className="inline-flex items-center gap-2 whitespace-nowrap transition hover:opacity-90"
            >
              {content}
            </Link>
          );
        }

        return (
          <span
            key={`${item.text}-${index}`}
            className="inline-flex items-center gap-2 whitespace-nowrap"
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}

export function PromoTicker({ items }: PromoTickerProps) {
  if (items.length === 0) return null;

  const tracks = [items, items];

  return (
    <div
      className="overflow-hidden border-y border-white/10 bg-[linear-gradient(90deg,#00c6ff_0%,#0072ff_28%,#7b2ff7_62%,#f107a3_100%)]"
      role="region"
      aria-label="Ofertas y promociones"
    >
      <div className="flex h-10 items-center sm:h-11">
        <div className="promo-ticker-track flex w-max items-center text-sm font-semibold text-white motion-reduce:w-full motion-reduce:justify-center">
          {tracks.map((trackItems, trackIndex) => (
            <TickerSegment
              key={trackIndex}
              items={trackItems}
              hidden={trackIndex === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
