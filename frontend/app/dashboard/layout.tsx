import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./_components/dashboard-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import restoreSession from "@/features/auth/restore-session";
import RestoreUserHydrator from "@/features/auth/restore-user-hydrator";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const user = await restoreSession();

  return (
    <div className="relative min-h-screen w-screen">
      <RestoreUserHydrator user={user} />

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
