"use client";

import * as React from "react";
import { MeChats } from "@/app/(pages)/channels/components/me/me-sidebar/me-chats";
import { MePanel } from "./me-main-panel";
import { NavUser } from "@/app/(pages)/channels/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { dataUser } from "@/app/config/data/data-user";
import { CommandMenu } from "../command-menu";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" className="scrollbar-none" {...props}>
      <div className="sticky top-0 z-10 bg-sidebar-background">
        <div className="px-2 py-2">
          <CommandMenu />
        </div>
        <Separator />
      </div>
      <SidebarContent className="h-full">
        <MePanel navmain={dataUser.meNavItems} />
        <Separator />
        <MeChats chats={dataUser.chats} />
      </SidebarContent>
      <Separator className="-translate-y-8"/>
      <SidebarFooter className="-translate-y-8 bg-usercard">
        <NavUser user={dataUser.user} status={dataUser.user.status} />
      </SidebarFooter>
    </Sidebar>
  );
}