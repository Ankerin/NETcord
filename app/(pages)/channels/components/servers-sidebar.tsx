"use client";

import { useState, useCallback, useRef, useEffect } from 'react'
import { CalendarDays, HomeIcon as House } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { dataServer } from "@/app/config/data/data-server"
import { useRouter } from 'next/navigation';

export default function ServerSidebar() {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const hoverIntentTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter()

  const handleMouseEnter = useCallback((id: string) => {
    if (hoverIntentTimeoutRef.current) {
      clearTimeout(hoverIntentTimeoutRef.current);
    }
    hoverIntentTimeoutRef.current = setTimeout(() => {
      setActiveHoverId(id);
    }, 50); // Небольшая задержка для предотвращения нежелательных срабатываний
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverIntentTimeoutRef.current) {
      clearTimeout(hoverIntentTimeoutRef.current);
    }
    hoverIntentTimeoutRef.current = setTimeout(() => {
      setActiveHoverId(null);
    }, 100); // Небольшая задержка перед скрытием
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hoverCardRef.current && !hoverCardRef.current.contains(event.target as Node)) {
        setActiveHoverId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverIntentTimeoutRef.current) {
        clearTimeout(hoverIntentTimeoutRef.current);
      }
    };
  }, []);

  const handleRedirectMe = () => {
    if (router) {
      router.push(`/channels/me`);
    }
  };


  return (
    <div className="fixed top-0 left-0 z-30 flex h-full mt-8 w-[66px] flex-col items-center bg-muted py-1.5 space-y-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={handleRedirectMe}
              aria-label="Главная" 
              className="group flex items-center h-[50px] w-[50px] justify-center shadow-lg bg-zinc-600/25 hover:bg-primary-foreground/100 -mt-1 rounded-3xl transition-all duration-150 ease-linear hover:rounded-[1.2rem]"
            >
              <House className="h-7 w-7 text-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="-translate-y-2 animate-in slide-in-from-left-1 duration-50">
            <p>Главная</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator className="h-0.5 w-8 bg-background -translate-y-[-1px]" style={{ borderRadius: '6px' }} />

      {dataServer.servers.map((server) => (
        <HoverCard key={server.id} open={activeHoverId === server.id.toString()}>
          <HoverCardTrigger asChild>
            <div 
              className="flex items-center relative group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(server.id.toString())}
              onMouseLeave={handleMouseLeave}
            >
              <Separator className="h-6 w-1 bg-zinc-600 rounded-full absolute left-[-8px] opacity-0" />
              <button className="flex items-center justify-center transition-all duration-150 ease-in-out cursor-pointer">
                <div className="relative cursor-pointer shadow-full overflow-hidden items-center mx-auto">
                  <Avatar className="h-[50px] w-[50px] rounded-3xl transition-all duration-150 ease-linear hover:rounded-[1.2rem]">
                    <AvatarImage 
                      src={server.logo} 
                      alt={server.name} 
                      className="object-cover w-full h-full transition-all duration-150 ease-in-out"
                    />
                    <AvatarFallback>{server.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </button>
            </div>
          </HoverCardTrigger>

          <HoverCardContent 
            ref={hoverCardRef}
            className="w-80 z-50 p-0 overflow-hidden rounded-[1rem] shadow-lg"
            onMouseEnter={() => setActiveHoverId(server.id.toString())}
            onMouseLeave={handleMouseLeave}
            side="right"
            sideOffset={16}
            align="start"
            alignOffset={-20}
          >
            {server.bannerSrc && (
              <div
                className="relative h-32"
                style={{
                  backgroundImage: `url(${server.bannerSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
              </div>
            )}
            <div className="p-4">
              <div className="flex space-x-4">
                <Avatar className="rounded-full">
                  <AvatarImage src={server.logo} alt={server.name} className="object-cover w-full h-full" />
                  <AvatarFallback>{server.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <h4 className="text-sm font-semibold">{server.name}</h4>
                    {server.icon && <server.icon size={18} className="text-foreground" />}
                  </div>
                  <p className="text-sm text-foreground mb-2">{server.description}</p>
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {server.joinedDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}