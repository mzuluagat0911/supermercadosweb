import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Administración",
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
