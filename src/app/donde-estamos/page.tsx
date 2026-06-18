import { StoreLocator } from "@/components/stores/StoreLocator";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Dónde estamos",
};

export default async function DondeEstamosPage() {
  const stores = await prisma.store.findMany({
    where: { active: true },
    orderBy: [{ brand: "asc" }, { sortOrder: "asc" }],
  });

  return (
    <div className="bg-background">
      <div className="border-b border-border bg-white py-12">
        <div className="section-container">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ahorro">
            Dónde estamos
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold sm:text-5xl">
            Encuentra tu sucursal
          </h1>
        </div>
      </div>
      <StoreLocator stores={stores} />
    </div>
  );
}
