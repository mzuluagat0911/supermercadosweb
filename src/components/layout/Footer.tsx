import Link from "next/link";
import { Mail } from "lucide-react";
import { BrandLogos } from "@/components/brand/BrandLogos";
import { NAV_LINKS } from "@/lib/constants";
import type { SiteSettings } from "@/generated/prisma/client";

type FooterProps = {
  settings: SiteSettings | null;
};

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-white text-foreground">
      <div className="section-container py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <BrandLogos layout="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Dos marcas, un mismo compromiso: calidad, frescura y los mejores precios
              para tu hogar.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
              Navegación
            </p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/80 transition hover:text-ahorro"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
              Contacto
            </p>
            {settings?.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="mb-4 flex items-center gap-2 text-sm text-foreground/80 transition hover:text-ahorro"
              >
                <Mail className="h-4 w-4 shrink-0 text-ahorro" />
                {settings.contactEmail}
              </a>
            )}
            <div className="flex gap-2">
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-ahorro transition hover:border-ahorro hover:bg-ahorro hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                  </svg>
                </a>
              )}
              {settings?.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-centro-dark transition hover:border-centro hover:bg-centro hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M13 10V7.5c0-.8.7-1.5 1.5-1.5H16V3h-2.2C11.7 3 10 4.7 10 7v3H7v3.5h3V21h3v-7.5h2.5L16 13h-3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} Supermercados El Ahorro & Del Centro. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}
