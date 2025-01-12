'use client'

import * as React from "react"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toasts } from "../toasts"
import { Eye, EyeOff } from 'lucide-react'
import { EmailInput } from "./EmailInput"
import { PhoneInput } from "./PhoneInput"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingTriangle } from '@/components/loading/LoadingTriangle'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Icons } from "@/app/(pages)/registration/assets/icons";
import { Icon20LogoVk } from "@vkontakte/icons";
import { FaTelegram, FaSteam } from "react-icons/fa6";

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

if (!API_URL || !API_KEY) {
  throw new Error('Missing required environment variables')
}

const LOG_PREFIX = '[Registration]'

export function UserAuthForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"email" | "phone" | "services">("email");
  const router = useRouter();
  const { login } = useAuth();
  const { showAuthErrorToast, showAuthErrorToastData } = Toasts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      if (activeTab === "services") {
        // Logic for third-party services authentication
        showAuthErrorToast(); // Temporary for demonstration
        setIsLoading(false);
        return;
      }

      const identifier = activeTab === "email" ? email : phone;

      const response = await fetch(`${API_URL}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY || '',
        },
        body: JSON.stringify({ identifier, password, type: activeTab }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        router.push('/channels/');
      } else {
        const errorData = await response.json();
        showAuthErrorToastData();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      showAuthErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn("w-full max-w-4xl", className)} {...props}>
      <CardContent className="p-0">
        <div className="grid grid-cols-2">
          <div className="p-6 flex flex-col items-center justify-center min-h-[500px]">
            <div className="relative bottom-10 text-2xl font-semibold tracking-tight text-balance text-center leading-loose md:text-left">
              <a className="text-primary">NET</a>cord
            </div>
            <Tabs
                defaultValue="email"
                className="w-full space-y-8"
                onValueChange={(value) => setActiveTab(value as "email" | "phone" | "services")}
            >

              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="email">Почта</TabsTrigger>
                <TabsTrigger value="phone">Телефон</TabsTrigger>
                <TabsTrigger value="services" disabled>Сервисы</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleSubmit} className="space-y-6 ">
                    <EmailInput
                      value={email}
                      onChange={setEmail}
                      disabled={isLoading}
                    />
                    <div className="relative group">
                        <Label
                          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-card px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
                        >
                          Пароль
                        </Label>
                        <div className="relative">
                            <Input
                              className="pe-9"
                              type="password"
                              id="password"
                              placeholder="Пароль"
                              disabled={isLoading}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        Авторизация
                    </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={handleSubmit} className="space-y-6 ">
                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      disabled={isLoading}
                    />
                    <div className="relative group">
                        <Label
                          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-card px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
                        >
                            Пароль
                        </Label>
                        <div className="relative">
                            <Input
                              className="pe-9"
                              type="password"
                              id="password"
                              placeholder="Пароль"
                              disabled={isLoading}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        Авторизация
                    </Button>
                </form>
              </TabsContent>

              <TabsContent value="services">
                <Button variant="outline" disabled={isLoading} onClick={(e) => e.stopPropagation()}>
                  <Icons.yandex className="h-4 w-4" />
                  Yandex ID
                </Button>
                <Button variant="outline" disabled={isLoading} onClick={(e) => e.stopPropagation()}>
                  <FaTelegram />
                  Telegram
                </Button>
                <Button variant="outline" disabled={isLoading} onClick={(e) => e.stopPropagation()}>
                  <Icons.sber className="h-8 w-8" />
                  Sber ID
                </Button>
                <Button variant="outline" disabled={isLoading} onClick={(e) => e.stopPropagation()}>
                  <FaSteam />
                  Steam
                </Button>
                <Button variant="outline" disabled={isLoading} onClick={(e) => e.stopPropagation()}>
                  <Icon20LogoVk className="h-4 w-4" />
                  VK
                </Button>
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center text-sm">
              <a className="text-muted-foreground">Нет аккаунта? </a>
              <span 
                className="text-muted-foreground underline underline-offset-4 cursor-pointer hover:text-primary transition-colors relative inline-block group"
                onClick={() => router.push('/registration')}
              >
                Регистрация
                <span className="absolute bottom-0 left-0 w-0 h-0.5"></span>
              </span>
            </div>
          </div>
          <div className="overflow-hidden">
            <LoadingTriangle />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}