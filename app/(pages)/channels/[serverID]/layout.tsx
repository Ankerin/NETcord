import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/server/server-sidebar/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar className="mt-8 ml-[66px] h-screen overflow-y-auto fixed z-10" /> {/* Добавлены классы h-screen и overflow-y-auto */}
        {children}
      </SidebarProvider>
    </main>
  )
}