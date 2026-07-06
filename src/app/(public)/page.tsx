import { HeroSlider } from "@/components/home/HeroSlider";
import { DomiciliosSection } from "@/components/home/DomiciliosSection";
import { StoresPreview } from "@/components/home/StoresPreview";
import { PromoTicker } from "@/components/layout/PromoTicker";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [banners, stores, tickerItems] = await Promise.all([
    prisma.banner.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.store.findMany({
      where: { active: true },
      orderBy: [{ brand: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.promoTickerItem.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <>
      <HeroSlider banners={banners} />
      <PromoTicker items={tickerItems} />
      <DomiciliosSection />
      <StoresPreview stores={stores} />
    </>
  );
}
