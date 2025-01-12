"use client";

import { useState } from "react";
import { Mic, Headphones, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SettingsDialog } from "./settings/settings-dialog";

export interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "online" | "inactive" | "disturb" | "invisible";
}

export function NavUser({ user, status }: NavUserProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2 justify-between py-1 px-0 h-[36px] pt-1">
          <SidebarMenuButton
            size="sm"
            className="relative w-[168px] group h-[40px] p-1 flex items-center gap-2"
          >
            <div className="relative inline-block">
              <Avatar className="h-9 w-9 border-transparent">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="absolute -bottom-[2.3px] -end-[2.6px] group-hover:border-muted size-4 rounded-full border-[3.5px] border-usercard bg-emerald-600"></span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Онлайн</p>
                  </TooltipContent>
                </Tooltip> 
              </TooltipProvider>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-foreground">{user.name}</span>
              <span className="text-xs font-semibold tracking-tight text-foreground">В сети</span>
            </div>
          </SidebarMenuButton>
          <div className="flex items-center gap-0 -mt-0">
            <SidebarMenuButton
              size="sm"
              className="w-8 h-8 flex items-center justify-center p-0"
            >
              <Mic className="h-3.5 w-3.5" />
            </SidebarMenuButton>
            <SidebarMenuButton
              size="sm"
              className="w-8 h-8 flex items-center justify-center p-0"
            >
              <Headphones className="h-3.5 w-3.5" />
            </SidebarMenuButton>
            <SidebarMenuButton
              onClick={() => setIsSettingsOpen(true)}
              size="sm"
              className="w-8 h-8 flex items-center justify-center p-0"
            >
              <Settings className="h-3.5 w-3.5" />
            </SidebarMenuButton>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}