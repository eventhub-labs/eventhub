import Logo from "@/components/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  CalendarClock,
  CalendarDays,
  House,
  ListChecks,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import UserMenuItem from "./user-menu-item";

const sidebarMenuItems = [
  {
    name: "Home",
    url: "/dashboard",
    icon: <House />,
  },
  {
    name: "My events",
    url: "/dashboard/my-events",
    icon: <CalendarDays />,
  },
  {
    name: "Upcoming",
    url: "/dashboard/upcoming-events",
    icon: <CalendarClock />,
  },
  {
    name: "Calendar",
    url: "/dashboard/events-calendar",
    icon: <Calendar />,
  },
  {
    name: "Tasks",
    url: "/dashboard/my-tasks",
    icon: <ListChecks />,
  },
  {
    name: "People",
    url: "/dashboard/friends",
    icon: <Users />,
  },
  {
    name: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
];

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b-2 p-6">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarMenu className="gap-y-2">
            {sidebarMenuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  {item.icon}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-2 p-2">
        <UserMenuItem />
      </SidebarFooter>
    </Sidebar>
  );
}
