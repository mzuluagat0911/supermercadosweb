import { BrandLogos } from "@/components/brand/BrandLogos";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Iniciar sesión",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#1b1310]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
        <section className="flex flex-1 flex-col justify-between px-6 py-10 text-white sm:px-10 lg:px-12 lg:py-12">
          <BrandLogos layout="footer" variant="on-dark" />

          <div className="my-10 max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-centro-orange">
              Centro de operaciones
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Panel corporativo del supermercado
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Administrá campañas, promos y RRHH hoy. Mañana, este mismo espacio puede recibir
              pedidos, consultar inventario y activar un agente de WhatsApp automático.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["Contenido web", "Pedidos en vivo", "Agente WhatsApp"].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">
                  {index === 0 ? "Hoy" : "Próximo"}
                </p>
                <p className="mt-1 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center bg-[#f7f6f3] px-6 py-10 sm:px-10">
          <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ahorro">
              Acceso admin
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Ingresar</h2>
            <p className="mt-2 text-sm text-muted">
              Usá tus credenciales para entrar al dashboard.
            </p>
            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
