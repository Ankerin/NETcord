import { AudioLines, ChevronRight, MessageSquareText, MessagesSquare, Mic, MoreHorizontal, Settings, Trash } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavItem } from "@/app/config/data/data-server";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NavMainProps {
  items: NavItem[];
}


export function ServerChannels({ items }: NavMainProps) {

  const { isMobile } = useSidebar()

  return (
    <>
      {items.map((item: NavItem) => (
        <Collapsible
          key={item.title}
          title={item.title}
          className="group/collapsible"
        >
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel
              asChild
              className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                {item.title}{" "}
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items?.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild isActive={subItem.isActive} >
                      <a href={subItem.url} className="flex w-full items-center">
                        {subItem.type === "text" && <MessageSquareText className="mr-2" />}
                        {subItem.type === "voice" && <AudioLines className="mr-2" />}
                        {subItem.type === "forum" && <MessagesSquare className="mr-2" />}
                        <span className="truncate">{subItem.title}</span>
                      </a>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction>
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          className="w-56 rounded-lg"
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem>
                            <Settings/>
                            <span>Настройки</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator/>
                          <DropdownMenuItem>
                            <Trash className="text-red-600"/>
                            <span className="text-red-600">Удалить канал</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                  {item.items?.length === 0 && (
                    <div>Увы, сервер пуст.</div>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}