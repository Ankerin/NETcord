import { siteConfig } from "@/app/config/data/socials-config"

export function SiteFooter() {
  return (
    <footer className="py-3 md:px-20 md:py-0 w-full">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024{" "}
          <a>
            NETcord, Inc.
          </a>
        </p>
      </div>
    </footer>
  )
}