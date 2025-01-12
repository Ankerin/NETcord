import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChatItem } from "@/app/config/data/data-user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { EthernetPort, Moon, CircleMinus, CircleDashed } from "lucide-react"
import { ForwardRefExoticComponent } from "react"; // Для ForwardRefExoticComponent
import { LucideProps } from "lucide-react"; // Для LucideProps
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Типы для статусов
type Status = "online" | "inactive" | "disturb" | "invisible";

// Иконки для статусов
const statusIconsUsers: Record<Status, ForwardRefExoticComponent<LucideProps>> = {
  online: EthernetPort,
  inactive: Moon,
  disturb: CircleMinus,
  invisible: CircleDashed,
};

interface NavMainProps {
  chats: ChatItem[];
}

export function MeChats({ chats }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {chats.map((chat) => {
          const StatusIcon = statusIconsUsers[chat.status]; // Теперь типизация верна
          return (
            <SidebarMenuItem className="group" key={chat.id}>
              <SidebarMenuButton asChild isActive={chat.isActive}>
                <a
                  href={chat.url}
                  className="flex items-center w-full py-3 px-2 min-h-11 rounded-md hover:bg-sidebar-accent"
                >
                  <div className="relative inline-block">
                    <Avatar className="h-9 w-9 border-transparent">
                      <AvatarImage src={chat.avatar} alt={chat.title} />
                    </Avatar>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="absolute -bottom-[2.3px] -end-[2.7px] group-hover:border-muted size-4 rounded-full border-[3.5px] border-sidebar bg-emerald-600"></span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Онлайн</p>
                        </TooltipContent>
                      </Tooltip> 
                    </TooltipProvider>
                  </div>
                  <span className="text-sidebar-foreground">{chat.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}