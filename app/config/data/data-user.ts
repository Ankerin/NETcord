import { Map, Store, Users, EthernetPort, Moon, CircleDashed, CircleMinus } from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import { LucideProps } from "lucide-react";

// Интерфейс для пользователя
export interface User {
  name: string;
  email: string;
  avatar: string;
  status: "online" | "inactive" | "disturb" | "invisible";
}

// Интерфейс для чатов
export interface ChatItem {
  id: number;
  avatar: string;
  title: string;
  url: string;
  isActive?: boolean;
  status: "online" | "inactive" | "disturb" | "invisible";
}

// Интерфейс для навигации
export interface MeNavItem {
  name: string;
  url: string;
  icon: ForwardRefExoticComponent<LucideProps>;
}

// Определение данных
export const dataUser = {
  user: {
    name: "Ankerin",
    email: "сидит",
    avatar: "https://i.pinimg.com/originals/2d/00/e9/2d00e9b361579d16e8af7347b14d9832.gif",
    status: "invisible",
  } as User,

  chats: [
    {
      id: 1,
      avatar: "https://i.pinimg.com/236x/db/8b/e5/db8be51bc08c87b7d43233de20b5dd07.jpg",
      title: "Ishak",
      url: "#",
      isActive: false,
      status: "online",
    },
    {
      id: 2,
      avatar: "https://i.pinimg.com/originals/c2/55/2a/c2552a95983aa61b54dd7b40446f2be5.gif",
      title: "Gnida",
      url: "#",
      isActive: false,
      status: "inactive",
    },
    {
      id: 3,
      avatar: "https://i.pinimg.com/236x/4c/4a/ff/4c4aff2a23052c0c7e6beb325863fc31.jpg",
      title: "Pon",
      url: "#",
      isActive: false,
      status: "disturb",
    },
    {
      id: 4,
      avatar: "https://i.pinimg.com/236x/12/f4/8c/12f48c532073279d5ea5ed9aaf344943.jpg",
      title: "Gavnaed",
      url: "#",
      isActive: false,
      status: "invisible",
    },
  ] as ChatItem[],

  meNavItems: [
    {
      name: "Друзья",
      url: "#",
      icon: Users,
    },
    {
      name: "Магазин",
      url: "#",
      icon: Store,
    },
    {
      name: "Путешествие",
      url: "#",
      icon: Map,
    },
  ] as MeNavItem[],
};
