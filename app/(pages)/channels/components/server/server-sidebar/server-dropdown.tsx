"use client";

import * as React from "react";
import {
  ChevronDown,
  X,
  LogOut,
  Settings2,
  UserRoundPlus,
  BellRing,
  KeyboardMusic,
  Gem,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";

export function ServerDropdown({
  servers,
  bannerHeight = 150, // Высота баннера
}: {
  servers: {
    name: string;
    logo: string;
    bannerSrc?: string;
    plan: string;
  }[];
  bannerHeight?: number;
}) {
  const { isMobile } = useSidebar();
  const [activeServer, setActiveServer] = React.useState(servers[0]);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isBannerVisible, setIsBannerVisible] = React.useState(
    Boolean(activeServer.bannerSrc)
  );

  const toggleBanner = () => {
    setIsBannerVisible(!isBannerVisible);
  };

  return (
    <div className="w-full group-data-[collapsible=icon]:hidden">
      {/* Если баннер виден, отображаем его */}
      {isBannerVisible && activeServer.bannerSrc ? (
        <div
          className="relative w-full overflow-hidden"
          style={{ height: `${bannerHeight}px` }}
        >
          <img
            src={activeServer.bannerSrc}
            alt={`${activeServer.name} banner`}
            className=" inset-0 w-full h-full object-cover"
          />


          {/* Элемент с названием сервера и триггером меню */}
          <DropdownMenu onOpenChange={(open) => setMenuOpen(open)}>
            <DropdownMenuTrigger asChild>
              <div
                className="absolute top-0 left-0 right-0 bg-black/50 flex items-center justify-between p-3 cursor-pointer"
                onClick={toggleBanner}
              >
                <span className="text-white font-semibold truncate">
                  {activeServer.name}
                </span>
                <div
                  className={`transition-transform transform ${
                    menuOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  {menuOpen ? (
                    <X className="text-white h-5 w-5" />
                  ) : (
                    <ChevronDown className="text-white h-5 w-5" />
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 rounded-lg -translate-x-1 items-center"
              side={isMobile ? "bottom" : "bottom"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <Settings2 className="h-4 w-4" />
                </div>
                <div className="font-medium">Настройки сервера</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <KeyboardMusic className="h-4 w-4" />
                </div>
                <div className="font-medium">Панель управления</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <BellRing className="h-4 w-4" />
                </div>
                <div className="font-medium">Уведомления</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <UserRoundPlus className="h-4 w-4" />
                </div>
                <div className="font-medium">Пригласить людей</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <LogOut className="h-4 w-4 text-red-600" />
                </div>
                <div className="font-medium text-red-600">Покинуть сервер</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 flex items-center space-x-1">
            <span className="text-white truncate text-xs">{activeServer.plan}</span>
            <Gem size={15} className="text-white" />
          </div>
        </div>
      ) : (
        <div className="bg-sidebar-background p-3 flex items-center justify-between cursor-pointer">
          <DropdownMenu onOpenChange={(open) => setMenuOpen(open)}>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-between w-full">
                <span className="text-white font-semibold truncate">
                  {activeServer.name}
                </span>
                <div
                  className={`transition-transform transform ${
                    menuOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  {menuOpen ? (
                    <X className="text-white h-5 w-5" />
                  ) : (
                    <ChevronDown className="text-white h-5 w-5" />
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 rounded-lg translate-y-4 translate-x-0 items-center"
              side={isMobile ? "bottom" : "bottom"}
              align="center"
              sideOffset={3}
            >
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <Settings2 className="h-4 w-4" />
                </div>
                <div className="font-medium">Настройки сервера</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <KeyboardMusic className="h-4 w-4" />
                </div>
                <div className="font-medium">Панель управления</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <BellRing className="h-4 w-4" />
                </div>
                <div className="font-medium">Уведомления</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <UserRoundPlus className="h-4 w-4" />
                </div>
                <div className="font-medium">Пригласить людей</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
                  <LogOut className="h-4 w-4 text-red-600" />
                </div>
                <div className="font-medium text-red-600">Покинуть сервер</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}