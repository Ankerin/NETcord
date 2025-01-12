import { AppSidebar } from "../components/me/me-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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