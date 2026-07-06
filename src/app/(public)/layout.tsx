import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { prisma } from "@/lib/prisma";

async function getLayoutData() {
  const [stores, settings] = await Promise.all([
    prisma.store.findMany({
      where: { active: true },
      orderBy: [{ brand: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
  ]);

  return { stores, settings };
}

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { stores, settings } = await getLayoutData();

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat stores={stores} />
    </div>
  );
}
