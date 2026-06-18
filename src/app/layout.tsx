import { DM_Sans, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { prisma } from "@/lib/prisma";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Supermercados El Ahorro & Del Centro",
    template: "%s | Supermercados El Ahorro & Del Centro",
  },
  description:
    "Supermercados El Ahorro y Supermercados del Centro: calidad, frescura y los mejores precios. Encuentra tu sucursal y haz tu pedido por WhatsApp.",
};

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { stores, settings } = await getLayoutData();

  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsAppFloat stores={stores} />
      </body>
    </html>
  );
}
