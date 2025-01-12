"use client";

//import { ModeToggle } from "@/components/mode-toggle"

function SiteHeade() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex translate-y-12 items-center px-4 sm:px-8 md:px-20">
        <div className="absolute right-4 sm:right-8 md:right-20 mr-4 flex">
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {/*<div className="transform translate-x-4">
              <ModeToggle/>
            </div>*/}
          </div>
        </div>
        <div className="absolute left-4 sm:left-8 md:left-20 ml-4 flex">
          <div className="text-2xl font-semibold tracking-tight text-balance text-center leading-loose md:text-left">
            <a className="text-primary">NET</a>cord
          </div>
        </div> 
      </div>
    </header>
  )
}

export { 
  SiteHeade,
};