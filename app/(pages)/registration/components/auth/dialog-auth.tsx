'use client';

import * as React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from "@/app/(pages)/registration/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon20LogoVk } from "@vkontakte/icons";
import { FaTelegram, FaSteam } from "react-icons/fa6";
import { Toasts } from "../../toasts";
import { useAuth } from "@/hooks/useAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export function DialogAuth() {
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
        router.push('/me');
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
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Авторизоваться
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Авторизация</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="email"
          className="w-full"
          onValueChange={(value) => setActiveTab(value as "email" | "phone" | "services")}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Почта</TabsTrigger>
            <TabsTrigger value="phone">Телефон</TabsTrigger>
            <TabsTrigger value="services" disabled>Сервисы</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Электронная почта</CardTitle>
                  <CardDescription>Введите вашу электронную почту для авторизации.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="auth-email">Почта</Label>
                  <Input
                    id="auth-email"
                    placeholder="user@netcord.net"
                    type="email"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Label htmlFor="password-email">Пароль</Label>
                  <Input
                    id="password-email"
                    placeholder="Пароль"
                    type="password"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} onClick={(e) => e.stopPropagation()}>Войти</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="phone">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Номер телефона</CardTitle>
                  <CardDescription>Введите ваш номер телефона для авторизации.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="auth-phone">Номер телефона</Label>
                  <Input
                    id="auth-phone"
                    placeholder="+7 (999) 999 99-99"
                    type="tel"
                    disabled={isLoading}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Label htmlFor="password-phone">Пароль</Label>
                  <Input
                    id="password-phone"
                    placeholder="Пароль"
                    type="password"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} onClick={(e) => e.stopPropagation()}>Войти</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Сторонние сервисы</CardTitle>
                <CardDescription>Авторизуйтесь через один из сервисов ниже.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-2">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}