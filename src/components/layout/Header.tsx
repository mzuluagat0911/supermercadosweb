import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { BrandLogos } from "@/components/brand/BrandLogos";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="section-container">
        <div className="flex min-h-[4.5rem] items-center justify-between gap-4 py-3 sm:min-h-[4.75rem] sm:gap-6">
          <BrandLogos layout="header" linked className="shrink-0" />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-ahorro-light hover:text-ahorro"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/donde-estamos"
            className="hidden rounded-full bg-ahorro px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ahorro-dark sm:inline-flex"
          >
            Haz tu pedido
          </Link>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-border/60 py-2 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-ahorro-light hover:text-ahorro"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
