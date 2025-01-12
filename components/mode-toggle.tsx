"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { SunIcon, MoonIcon, FileSliders } from 'lucide-react'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="inline-flex items-center justify-center rounded-full p-[1px] bg-border">
      <div className="relative flex items-center rounded-full bg-background p-1">
        <span 
          className="absolute h-7 w-7 rounded-full bg-border transition-transform duration-200 ease-in-out"
          style={{
            transform: `translateX(${
              theme === 'system' ? '0' : theme === 'light' ? '100%' : '200%'
            })`,
          }}
        />
        <ToggleButton
          icon={FileSliders}
          isActive={theme === 'system'}
          onClick={() => setTheme("system")}
          label="Системная тема"
        />
        <ToggleButton
          icon={SunIcon}
          isActive={theme === 'light'}
          onClick={() => setTheme("light")}
          label="Светлая тема"
        />
        <ToggleButton
          icon={MoonIcon}
          isActive={theme === 'dark'}
          onClick={() => setTheme("dark")}
          label="Тёмная тема"
        />
      </div>
    </div>
  )
}

interface ToggleButtonProps {
  icon: React.ElementType
  isActive: boolean
  onClick: () => void
  label: string
}

function ToggleButton({ icon: Icon, isActive, onClick, label }: ToggleButtonProps) {
  return (
    <button
      className={cn(
        "relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors text-foreground",
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </button>
  )
}