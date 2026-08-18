"use client";

import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/store/user";
import { LogOut } from "lucide-react";
import Image from "next/image";

export default function UserMenuItem() {
  const { user } = useUser();

  if (!user) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton className="p-1">
          <div className="relative aspect-square h-full">
            <Skeleton className="h-full rounded-full" />
          </div>
          <div className="flex flex-col gap-y-1">
            <Skeleton className="h-2 w-24" />
            <Skeleton className="h-2 w-18" />
          </div>
        </SidebarMenuButton>
        <SidebarMenuAction>
          <Skeleton className="h-4 w-4" />
        </SidebarMenuAction>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton render={<a href="/dashboard/user" />} className="p-1">
        <div className="relative aspect-square h-full">
          <Image
            className="w-12"
            src="/img/no-user.png"
            alt="user image"
            fill
            sizes="48"
          />
        </div>
        <div className="flex flex-col">
          <span>
            {user?.name} {user?.surname}
          </span>
          <span>{user?.email}</span>
        </div>
      </SidebarMenuButton>
      <SidebarMenuAction>
        <LogOut /> <span className="sr-only">Log out</span>
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
}
