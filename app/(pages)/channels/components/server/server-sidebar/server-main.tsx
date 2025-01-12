"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function ServerMain({
  navserver,
}: {
  navserver: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navserver.map((navserver) => (
          <SidebarMenuItem key={navserver.name}>
            <SidebarMenuButton asChild tooltip={navserver.name}>
              <a href={navserver.url}>
                <navserver.icon />
                <span className="font-medium">{navserver.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
