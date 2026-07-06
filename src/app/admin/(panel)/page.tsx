import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [activeBanners, activeTickerItems, pendingApplications, totalApplications] =
    await Promise.all([
      prisma.banner.count({ where: { active: true } }),
      prisma.promoTickerItem.count({ where: { active: true } }),
      prisma.hrApplication.count({ where: { status: "PENDING" } }),
      prisma.hrApplication.count(),
    ]);

  return (
    <AdminDashboard
      stats={{
        activeBanners,
        activeTickerItems,
        pendingApplications,
        totalApplications,
      }}
    />
  );
}
