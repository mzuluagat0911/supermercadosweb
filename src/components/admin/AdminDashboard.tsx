import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ImageIcon,
  Megaphone,
  Package,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";

type AdminDashboardProps = {
  stats: {
    activeBanners: number;
    activeTickerItems: number;
    pendingApplications: number;
    totalApplications: number;
  };
};

const MODULES = [
  {
    href: "/admin/banners",
    title: "Banners principales",
    description: "Sube imágenes y gestiona las campañas del slider de la home.",
    icon: ImageIcon,
    accent: "bg-ahorro-light text-ahorro",
  },
  {
    href: "/admin/ticker",
    title: "Franja de promos",
    description: "Edita los textos que se mueven debajo del banner principal.",
    icon: Megaphone,
    accent: "bg-[#e8f4ff] text-[#0072ff]",
  },
  {
    href: "/admin/rrhh",
    title: "Postulaciones RRHH",
    description: "Revisa hojas de vida y el estado de cada candidato.",
    icon: Users,
    accent: "bg-centro-light text-centro-dark",
  },
];

const ROADMAP = [
  {
    title: "Recepción de pedidos",
    description:
      "Un tablero en tiempo real para que cada sede reciba, confirme y despache pedidos del canal digital.",
    icon: ShoppingCart,
    badge: "Fase 2",
    cta: "Próximamente",
  },
  {
    title: "API de inventario",
    description:
      "Conectá el stock de ellos para validar disponibilidad, precios y sustitutos antes de confirmar un pedido.",
    icon: Package,
    badge: "Integración",
    cta: "Conectar inventario",
  },
  {
    title: "Agente WhatsApp",
    description:
      "Un asistente que toma pedidos automáticamente, consulta inventario y deriva a la sucursal correcta.",
    icon: Bot,
    badge: "IA + WhatsApp",
    cta: "Activar agente",
  },
];

export function AdminDashboard({ stats }: AdminDashboardProps) {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#b8141b_0%,#e31b23_42%,#1a9f42_100%)] p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
              Dashboard operativo
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Tu centro de control del supermercado
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              Hoy administrás contenido web. Mañana este mismo panel puede convertirse en la
              recepción de pedidos con inventario conectado y un agente de WhatsApp tomando
              solicitudes de forma automática.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Banners activos" value={stats.activeBanners} />
            <StatCard label="Promos activas" value={stats.activeTickerItems} />
            <StatCard label="RRHH pendientes" value={stats.pendingApplications} />
            <StatCard label="Postulaciones" value={stats.totalApplications} />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Módulos disponibles</h3>
            <p className="text-sm text-muted">Lo que ya podés administrar hoy.</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {MODULES.map(({ href, title, description, icon: Icon, accent }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-semibold">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ahorro">
                Administrar
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-centro-orange/15 p-2 text-centro-orange">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Próximas integraciones</h3>
            <p className="text-sm text-muted">
              Un adelanto de lo que viene para convertir este panel en operación comercial.
            </p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {ROADMAP.map(({ title, description, icon: Icon, badge, cta }) => (
            <article
              key={title}
              className="relative overflow-hidden rounded-2xl border border-dashed border-centro/25 bg-white p-5"
            >
              <div className="absolute right-4 top-4 rounded-full bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {badge}
              </div>
              <div className="mb-4 inline-flex rounded-xl bg-[#fff7f0] p-3 text-centro-orange">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="pr-16 font-semibold">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              <button
                type="button"
                disabled
                className="mt-5 inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-[#1b1310] px-4 py-2.5 text-sm font-semibold text-white opacity-80"
              >
                {cta}
                <span className="rounded-full bg-centro-orange px-2 py-0.5 text-[10px] uppercase">
                  Soon
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-sm">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-white/75">{label}</p>
    </div>
  );
}
