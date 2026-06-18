import { HeroSlider } from "@/components/home/HeroSlider";
import { DomiciliosSection } from "@/components/home/DomiciliosSection";
import { StoresPreview } from "@/components/home/StoresPreview";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [banners, stores] = await Promise.all([
    prisma.banner.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.store.findMany({
      where: { active: true },
      orderBy: [{ brand: "asc" }, { sortOrder: "asc" }],
    }),
  ]);

  return (
    <>
      <HeroSlider banners={banners} />
      <DomiciliosSection />
      <StoresPreview stores={stores} />
    </>
  );
}
