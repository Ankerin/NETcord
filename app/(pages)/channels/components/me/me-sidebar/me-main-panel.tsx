import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { MeNavItem } from "@/app/config/data/data-user";

interface NavMeProps {
  navmain: MeNavItem[];
}

export function MePanel({ navmain }: NavMeProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navmain.map((navItem) => (
          <SidebarMenuItem key={navItem.name}>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center space-x-2"
              tooltip={navItem.name}
            >
              <a href={navItem.url} className="flex items-center space-x-2">
                <navItem.icon className="h-5 w-5" />
                <span className="font-medium">{navItem.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}