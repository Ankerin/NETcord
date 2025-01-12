import ServerSidebar from "@/app/(pages)/channels/components/servers-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <ServerSidebar/>
      {children}
    </main>
  )
}