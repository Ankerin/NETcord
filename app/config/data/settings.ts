import { User, Lock, Bell, Shield } from 'lucide-react'
import { Category, Setting } from '@/types/settings'

export const categories: Category[] = [
  {
    id: 'account',
    label: 'Аккаунт',
    icon: User
  },
  {
    id: 'appearance',
    label: 'Внешний вид',
    icon: Lock
  },
  {
    id: 'notifications',
    label: 'Уведомления',
    icon: Bell
  },
  {
    id: 'privacy',
    label: 'Конфиденциальность',
    icon: Shield
  }
]

export const defaultSettings: Setting[] = [
  {
    id: 'theme',
    categoryId: 'appearance',
    type: 'theme',
    label: 'Тема',
    description: 'Выберите тему оформления'
  },
  {
    id: 'notifications_enable',
    categoryId: 'notifications',
    type: 'switch',
    label: 'Включить уведомления',
    description: 'Получать уведомления о новых сообщениях'
  }
]