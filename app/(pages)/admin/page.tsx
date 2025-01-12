'use client';

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserData, Banner, Badge } from '@/types/types'
import { ProfileCard } from './components/card/profile-card';

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState<UserData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers()
    }
  }, [isAuthenticated])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить пользователей",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('adminToken', data.token)
        setIsAuthenticated(true)
        toast({
          title: "Успех",
          description: "Вход выполнен успешно",
        })
      } else {
        const errorData = await response.json()
        toast({
          title: "Ошибка",
          description: errorData.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Ошибка входа:', error)
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при входе",
        variant: "destructive",
      })
    }
  }

  const handleBanUser = async (userId: string, duration: number) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/ban`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        },
        body: JSON.stringify({ userId, duration }),
      })
      if (response.ok) {
        toast({
          title: "Успех",
          description: `Пользователь заблокирован на ${duration} часов`,
        })
        fetchUsers()
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось заблокировать пользователя",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Ошибка при блокировке:', error)
    }
  }

  const handleAddBadge = async (userId: string, badgeType: Badge) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/badge`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        },
        body: JSON.stringify({ userId, badgeType }),
      })
      if (response.ok) {
        toast({
          title: "Успех",
          description: `Значок добавлен пользователю`,
        })
        fetchUsers()
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось добавить значок",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Ошибка при добавлении значка:', error)
    }
  }

  const handleRemoveBadge = async (userId: string, badgeType: Badge) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/badge`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        },
        body: JSON.stringify({ userId, badgeType }),
      })
      if (response.ok) {
        toast({
          title: "Успех",
          description: `Значок удален у пользователя`,
        })
        fetchUsers()
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить значок",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Ошибка при удалении значка:', error)
    }
  }

  const handleSendBanner = async (userId: string, message: string, variant: Banner['variant'], expiresAt?: string) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/banner`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        },
        body: JSON.stringify({ userId, message, variant, expiresAt }),
      })
      if (response.ok) {
        toast({
          title: "Успех",
          description: `Баннер отправлен пользователю`,
        })
        fetchUsers()
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить баннер",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Ошибка при отправке баннера:', error)
    }
  }

  const handleRemoveBanner = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/banner`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        },
        body: JSON.stringify({ userId }),
      })
      if (response.ok) {
        toast({
          title: "Успех",
          description: `Баннер удален у пользователя`,
        })
        fetchUsers()
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить баннер",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Ошибка при удалении баннера:', error)
    }
  }

  const filteredUsers = users.filter(user => 
    user.account.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.account.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Вход для администратора</CardTitle>
            <CardDescription>Введите свои учетные данные для доступа к панели администратора.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Пароль</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleLogin}>Войти</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Панель администратора</h1>
      <Input
        type="text"
        placeholder="Поиск пользователей по ID или никнейму"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(user => (
          <Dialog key={user.account.id}>
            <DialogTrigger asChild>
              <div>
                <ProfileCard
                  user={user} 
                  onSettingsClick={() => {}} // This is just a placeholder, the actual click is handled by DialogTrigger
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Управление пользователем: {user.account.nickname}</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="ban">
                <TabsList>
                  <TabsTrigger value="ban">Бан</TabsTrigger>
                  <TabsTrigger value="badges">Значки</TabsTrigger>
                  <TabsTrigger value="banner">Баннер</TabsTrigger>
                </TabsList>
                <TabsContent value="ban">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Заблокировать пользователя</h3>
                    <div className="flex items-center space-x-2">
                      <Input type="number" placeholder="Длительность (часы)" id="banDuration" />
                      <Button onClick={() => {
                        const duration = parseInt((document.getElementById('banDuration') as HTMLInputElement).value)
                        handleBanUser(user.account.id, duration)
                      }}>Заблокировать</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="badges">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Управление значками</h3>
                    <div className="flex items-center space-x-2">
                      <Input type="text" placeholder="Тип значка" id="badgeType" />
                      <Button onClick={() => {
                        const badgeType = (document.getElementById('badgeType') as HTMLInputElement).value as Badge
                        handleAddBadge(user.account.id, badgeType)
                      }}>Добавить</Button>
                      <Button variant="destructive" onClick={() => {
                        const badgeType = (document.getElementById('badgeType') as HTMLInputElement).value as Badge
                        handleRemoveBadge(user.account.id, badgeType)
                      }}>Удалить</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="banner">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Управление баннером</h3>
                    <div className="space-y-2">
                      <Input type="text" placeholder="Текст баннера" id="bannerMessage" />
                      <select id="bannerVariant" className="w-full p-2 border rounded">
                        <option value="success">Успех</option>
                        <option value="warning">Предупреждение</option>
                        <option value="error">Ошибка</option>
                      </select>
                      <Input type="datetime-local" id="bannerExpiry" />
                      <Button onClick={() => {
                        const message = (document.getElementById('bannerMessage') as HTMLInputElement).value
                        const variant = (document.getElementById('bannerVariant') as HTMLSelectElement).value as Banner['variant']
                        const expiresAt = (document.getElementById('bannerExpiry') as HTMLInputElement).value
                        handleSendBanner(user.account.id, message, variant, expiresAt || undefined)
                      }}>Отправить баннер</Button>
                      <Button variant="destructive" onClick={() => handleRemoveBanner(user.account.id)}>Удалить баннер</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}