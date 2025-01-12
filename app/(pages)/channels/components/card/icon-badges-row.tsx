'use client'

import { IconBadge } from "@/components/ui/icon-badge"

export function IconBadgesRow() {

  return (
    <div className="flex gap-1.5 rounded-lg">
      <IconBadge size="sm" shape="devnet" variant="pink" glowColor='rgba(255, 0, 255, 1)' glow tooltip="Разработчик NETcord" />
      <IconBadge size="sm" shape="moderator" variant="blue" glowColor='rgba(0, 3, 255, 1)' glow tooltip="Модератор" />
      <IconBadge size="sm" shape="netsub" variant="yellow" glowColor='rgba(255, 252, 0, 1)' glow tooltip="NETsub" />
      <IconBadge size="sm" shape="crystal" variant="red" glowColor="rgba(255, 0, 0, 1)" glow tooltip="Кристаллизатор сервера" />
      <IconBadge size="sm" shape="dev" variant="green" glowColor='rgba(0, 255, 24, 1)' glow tooltip="Разработчик приложений" />
    </div>
  )
}