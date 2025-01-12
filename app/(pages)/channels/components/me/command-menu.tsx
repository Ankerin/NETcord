"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type DialogProps } from "@radix-ui/react-dialog"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { commandConfig } from "../../config/command-config-me"

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  // Обработчик нажатия клавиш
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
    if ((e.code === "KeyK" && (e.metaKey || e.ctrlKey)) || e.code === "Slash") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Функция для выполнения команд
  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Навигация</span>
        <span className="lg:hidden">Навигация</span>
        <kbd className="pointer-events-none absolute right-1 top-1 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Введите команду для поиска..." />
        <CommandList>
          <CommandEmpty>Результатов не найдено.</CommandEmpty>

          {/* Основная навигация */}
          <CommandGroup heading="Главная">
            {commandConfig.mainNav.map((navItem) => {
              const Icon = navItem.icon || commandConfig.icons.link
              return (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => runCommand(() => router.push(navItem.href))}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {navItem.title}
                </CommandItem>
              )
            })}
          </CommandGroup>

          {/* Боковая навигация */}
          {commandConfig.sidebarNav.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem) => {
                const Icon = navItem.icon || commandConfig.icons.circle
                return (
                  <CommandItem
                    key={navItem.href}
                    value={navItem.title}
                    onSelect={() => runCommand(() => router.push(navItem.href))}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {navItem.title}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          ))}

          {/*<CommandSeparator/>

          <CommandGroup>
            {commandConfig.themeOptions.map((option) => (
              <CommandItem
                key={option.title}
                onSelect={() => runCommand(() => setTheme(option.theme))}
              >
                <option.icon className="mr-2 h-4 w-4" />
                {option.title}
              </CommandItem>
            ))}
          </CommandGroup>*/}
        </CommandList>
      </CommandDialog>
    </>
  )
}