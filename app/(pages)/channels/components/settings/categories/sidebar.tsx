"use client"

import { usePathname } from 'next/navigation'
import { Home, User, Bell, Shield, Video, Mic, Monitor, Lock, CreditCard, CalendarHeart, Gem, Gift } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const settingsCategories = [
  {
    title: 'Пользователь',
    items: [
      { id: 'account', label: 'Мой аккаунт', icon: Home, href: '/me/settings/account' },
      { id: 'profile', label: 'Профиль', icon: User, href: '/me/settings/profile' },
      { id: 'devices', label: 'Устройства', icon: Monitor, href: '/me/settings/devices' },
      { id: 'privacy', label: 'Конфиденциальность', icon: Shield, href: '/me/settings/privacy' },
    ]
  },
  {
    title: 'Платежи и подписки',
    items: [
      { id: 'billing', label: 'Платежи', icon: CreditCard, href: '/me/settings/billing' },
      { id: 'subscribe', label: 'Подписки', icon: CalendarHeart, href: '/me/settings/subscribe' },
      { id: 'crystal', label: 'Кристаллы', icon: Gem, href: '/me/settings/crystal' },
      { id: 'gifts', label: 'Подарки', icon: Gift, href: '/me/settings/gifts' },
    ]
  },
  {
    title: 'Приложение',
    items: [
      { id: 'notifications', label: 'Уведомления', icon: Bell, href: '/me/settings/notifications' },
      { id: 'video', label: 'Видео', icon: Video, href: '/me/settings/video' },
      { id: 'voice', label: 'Голос', icon: Mic, href: '/me/settings/voice' },
    ]
  },
  {
    title: 'Система',
    items: []
  }
]

interface SettingsSidebarProps {
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  currentCategory: string;
}

export function SettingsSidebar({ searchQuery, onCategoryChange, currentCategory }: SettingsSidebarProps) {
  const pathname = usePathname()

  // Фильтрация категорий на основе поискового запроса
  const filteredCategories = settingsCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0)

  return (
    <nav className="space-y-3">
      {filteredCategories.map((category) => (
        <div key={category.title} className="space-y-2">
          <h2 className="px-3 text-sm font-semibold tracking-tight text-muted-foreground">{category.title}</h2>
          <div className="space-y-1 flex flex-col items-center">
            {category.items.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-52 justify-start",
                  currentCategory === item.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                )}
                onClick={() => onCategoryChange(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}