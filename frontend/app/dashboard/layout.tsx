import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./_components/dashboard-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import RestoreUserHydrator from "@/features/auth/restore-user-hydrator";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="relative min-h-screen w-screen">
      <RestoreUserHydrator />

      <SidebarProvider>
        <DashboardSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>

      <ModeToggle className="absolute right-8 bottom-8" />
    </div>
  );
}
