import { type LucideIcon } from 'lucide-react'

export interface UserData {
  account: {
    id: string
    email: string
    number: string
    password: string
    nickname: string
    username: string
    birthDate: string
    registrationDate: string
    isVerified: boolean
    verificationCode?: string
    auth_token: string
    ip: string
    banExpiry?: string
    flags: UserFlags
  }
  profile: {
    avatarUrl: string
    bannerUrl: string
    accentColor: string
    primaryColor: string
    effect: Effect
  }
  badges: Badge[]
  activeBanner?: Banner
}

export type Badge = 'devnet' | 'moderator' | 'netsub' | 'crystal' | 'dev';

export interface BadgeData {
  type: Badge;
  label: string;
  color: string;
}

export interface UserFlags {
  admin: boolean
}

export interface Banner {
  message: string
  variant: 'success' | 'warning' | 'error'
  expiresAt?: string
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  status: "online" | "inactive" | "disturb" | "invisible";
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  images?: string[];
  author: User;
}

export interface Category {
  id: string
  label: string
  icon: LucideIcon
}

export interface Setting {
  id: string
  categoryId: string
  type: 'switch' | 'theme'
  label: string
  description: string
}

export type Effect = 'sparkles' | 'clouds' | 'snow' | 'fog' | 'autumn-leaves' | 'starry-night' | 'none'