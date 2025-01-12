import { BadgeCheck, Book, BookOpen, CalendarDays, CookingPot, Handshake, LucideIcon, MicVocal, Newspaper, Podcast, Users } from "lucide-react"

// Интерфейс для элементов навигации
export interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: Array<{
    title: string
    url: string
    type: "text" | "voice" | "forum"
    isActive?: boolean
  }>
}

// Интерфейс для серверов
export interface Server {
  id: number
  name: string
  logo: string
  bannerSrc: string
  joinedDate: string
  description: string
  icon: LucideIcon
  plan: string
}

// Интерфейс для навигации сервера
export interface ServerNavItem {
  name: string
  url: string
  icon: LucideIcon
}

// Определение данных с использованием интерфейсов
export const dataServer = {
  servers: [
    {
      id: 1,
      name: "NETcord",
      logo: "/netcord-logo.png",
      bannerSrc: "",
      joinedDate: "В числе участников с 2024 года",
      description: "Официальный сервер NETcord",
      icon: BadgeCheck,
      plan: "150",
    },
    {
      id: 2,
      name: "Blue AI",
      logo: "https://i.pinimg.com/originals/98/3b/63/983b63592a42295d638b4b3120df9cc8.gif",
      bannerSrc: "https://i.pinimg.com/originals/d2/09/10/d20910c0c0453e7c42a7ac37c5cb1c40.gif",
      joinedDate: "В числе участников с 2024 года",
      description: "Hi, this is our NET server Blue AI",
      icon: Handshake,
      plan: "50",
    },
  ] as Server[],
  navMain: [
    {
      title: "Рецепты тёти Гали",
      url: "#",
      icon: CookingPot,
      isActive: false,
      items: [
        { title: "казан 🍲", url: "#", type: "text" },
        { title: "барашка 🐑", url: "#", type: "text" },
        { title: "айран 🥛", url: "#", type: "text" },
      ],
    },
    {
      title: "Информация",
      url: "#",
      icon: Book,
      items: [
        { title: "Основы 📕", url: "#", type: "text" },
        { title: "Понятия 🤔", url: "#", type: "text" },
        { title: "Пусть будет 💩", url: "#", type: "forum" },
      ],
    },
    {
      title: "Информация",
      url: "#",
      icon: Book,
      items: [
        { title: "Основы 📕", url: "#", type: "text" },
        { title: "Понятия 🤔", url: "#", type: "text" },
        { title: "Пусть будет 💩", url: "#", type: "forum" },
      ],
    },
    {
      title: "Голосовые",
      url: "#",
      icon: MicVocal,
      items: [
        { title: "Побазарить ⚰️", url: "#", type: "voice" },
        { title: "По душам 🚬", url: "#", type: "voice" },
        { title: "важно ⚠️", url: "#", type: "voice" },
      ],
    },
    {
      title: "Надо",
      url: "#",
      icon: MicVocal,
      items: [
        { title: "Тоже ", url: "#", type: "text" },
        { title: "Пусть будет ", url: "#", type: "forum" },
        { title: "Почему и нет ", url: "#", type: "voice" },
      ],
    },
  ] as NavItem[],
  navserver: [
    {
      name: "Участники",
      url: "#/users/",
      icon: Users,
    },
    {
      name: "Новости",
      url: "#/news/",
      icon: Newspaper,
    },
    {
      name: "Правила",
      url: "#/rules/",
      icon: BookOpen,
    },
    {
      name: "События",
      url: "#/events/",
      icon: CalendarDays,
    },
    {
      name: "Трибуна",
      url: "#/tribune/",
      icon: Podcast,
    },
  ] as ServerNavItem[],
}