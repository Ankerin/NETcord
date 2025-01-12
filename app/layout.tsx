import type { Metadata } from "next"
import "./styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { fontSans } from "@/lib/fonts"
import ClientProtection from "./script/client-security"
import './styles/styles.css'
//import LoadingWrapper from "@/components/loadings/LoadingWrapper"
import { siteConfig } from "@/app/config/data/socials-config"
import WindowFrame from "@/components/WindowFrame"
import { AuthWrapper } from "@/components/AuthWrapper"

export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: `${siteConfig.description}`,
  icons: {
    icon: "/netcord-logo.png",
    shortcut: "/netcord-logo.png",
    apple: "/netcord-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={cn("", fontSans.variable)}>
        <WindowFrame />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProtection />
            <AuthWrapper>
              {children}
            </AuthWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}