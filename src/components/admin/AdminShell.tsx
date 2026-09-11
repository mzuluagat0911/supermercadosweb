"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bot,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Package,
  ShoppingCart,
  Users,
  ExternalLink,
  Sparkles,
  Newspaper,
} from "lucide-react";
import { BrandLogos } from "@/components/brand/BrandLogos";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/banners", label: "Banners", icon: ImageIcon },
  { href: "/admin/separata", label: "Separata", icon: Newspaper },
  { href: "/admin/ticker", label: "Franja promos", icon: Megaphone },
  { href: "/admin/rrhh", label: "RRHH", icon: Users },
];

const ROADMAP = [
  {
    icon: ShoppingCart,
    label: "Pedidos en vivo",
    hint: "Próximamente",
  },
  {
    icon: Package,
    label: "Inventario",
    hint: "Próximamente",
  },
  {
    icon: Bot,
    label: "Agente WhatsApp",
    hint: "Próximamente",
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col bg-[#1b1310] text-white lg:flex">
          <div className="border-b border-white/10 px-6 py-6">
            <BrandLogos layout="footer" variant="on-dark" className="scale-90 origin-left" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-centro-orange">
              Centro de operaciones
            </p>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
              Contenido web
            </p>
            {NAV.map(({ href, label, icon: Icon, exact }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-ahorro text-white shadow-lg shadow-ahorro/20"
                      : "text-white/75 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}

            <p className="px-3 pt-6 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
              En el radar
            </p>
            {ROADMAP.map(({ icon: Icon, label, hint }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-white/55"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-centro-orange">
                  {hint}
                </span>
              </div>
            ))}
          </nav>

          <div className="space-y-2 border-t border-white/10 p-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/8 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Ver sitio público
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-red-500/15 hover:text-red-200"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-border/80 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ahorro">
                  Panel corporativo
                </p>
                <h1 className="font-display text-xl font-semibold sm:text-2xl">
                  Supermercados El Ahorro & Del Centro
                </h1>
              </div>
              <div className="hidden items-center gap-2 rounded-full bg-centro-light px-4 py-2 text-sm font-medium text-centro-dark sm:flex">
                <Sparkles className="h-4 w-4 text-centro-orange" />
                Operación centralizada
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
              {NAV.map(({ href, label, exact }) => (
                <Link
                  key={href}
                  href={href}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                    isActive(href, exact)
                      ? "bg-ahorro text-white"
                      : "bg-white text-foreground/70 ring-1 ring-border"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
