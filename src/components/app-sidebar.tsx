"use client";

import { Search, Star } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const session = useSession();

  const data = {
    user: session.data?.user,
    navMain: [
      {
        title: "Favourites",
        url: "/",
        icon: Star,
        isActive: !!pathname.match(/\/$/)?.length,
      },
      {
        title: "Search",
        url: "/find",
        icon: Search,
        isActive: !!pathname.match(/\/find/)?.length,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
