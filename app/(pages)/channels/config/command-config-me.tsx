import { Moon, Sun, Laptop, File, Circle, Users, Store, Map, Smile, Settings, User, Bell } from "lucide-react"

export const commandConfig = {
    mainNav: [
      {
        title: "Друзья",
        href: "/",
        icon: Users,
      },
      {
        title: "Магазин",
        href: "/about",
        icon: Store,
      },
      {
        title: "Путешествие",
        href: "/about",
        icon: Map,
      },
    ],
    sidebarNav: [
      {
        title: "Прочее",
        items: [
          { title: "Настройки", href: "/", icon: Settings },
          { title: "Аккаунт", href: "/", icon: User },
          { title: "Профиль", href: "/", icon: Smile },
          { title: "Уведомления", href: "/", icon: Bell },
        ],
      },
    ],
    /*themeOptions: [
      {
        title: "Светлая тема",
        icon: Sun,
        theme: "light",
      },
      {
        title: "Тёмная тема",
        icon: Moon,
        theme: "dark",
      },
      {
        title: "Системная тема",
        icon: Laptop,
        theme: "system",
      },
    ],*/
    icons: {
      link: File,
      circle: Circle,
    },
}
  