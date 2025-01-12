"use client"

import * as React from "react"
import { ServerChannels } from "./server-channels"
import { ServerMain } from "./server-main"
import { NavUser } from "@/app/(pages)/channels/components/nav-user"
import { ServerDropdown } from "./server-dropdown"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { dataServer } from "@/app/config/data/data-server"
import { dataUser } from "@/app/config/data/data-user"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" {...props}>
      <ScrollArea className="rouded-md bg-sidebar-background whitespace-nowrap">
        <ServerDropdown servers={dataServer.servers}/>
      </ScrollArea>  
      <Separator/>
      <SidebarContent>
        <ServerMain navserver={dataServer.navserver}/>
        <Separator/>
        <ScrollArea className="h-full rounded-md overflow-hidden">
          <div className="gap-0">
            <ServerChannels items={dataServer.navMain}/>
          </div>
        </ScrollArea>
      </SidebarContent>
      <Separator className="-translate-y-8"/>
      <SidebarFooter className="-translate-y-8 bg-usercard">
        <NavUser user={dataUser.user} status={dataUser.user.status} />
      </SidebarFooter>
    </Sidebar>
  )
}