'use client'

import { Pencil, Lock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { IconBadgesRow } from './icon-badges-row'

interface UserData {
  id: string
  email: string
  nickname: string
  username: string
  number: string
  isVerified: boolean
  avatarUrl: string
  bannerUrl: string
  badges: string[]
}

interface UserProfileCardProps {
  userData: UserData
  onUpdate: (field: keyof UserData, value: string, password: string) => Promise<void>
}

export function UserProfileCard({ userData, onUpdate }: UserProfileCardProps) {
  const [editField, setEditField] = useState<{
    field: keyof UserData
    value: string
    label: string
  } | null>(null)
  const [editValue, setEditValue] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEdit = (field: keyof UserData, currentValue: string, label: string) => {
    setEditField({ field, value: currentValue, label })
    setEditValue(currentValue)
    setPassword('')
    setError('')
  }

  const handleSave = async () => {
    if (editField) {
      try {
        await onUpdate(editField.field, editValue, password)
        setEditField(null)
        setError('')
      } catch (error) {
        setError('Не удалось обновить. Пожалуйста, попробуйте еще раз.')
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-0">
        <div className="relative">
          <div className="h-48 z-10 rounded-t-xl overflow-hidden">
            <img 
              src={`http://localhost:3001/${userData.bannerUrl}`}
              alt="Баннер профиля"
              className="w-full h-full object-cover object-center"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
          <div className="absolute -bottom-12 left-6 flex items-center gap-2">
            <Avatar className="border-8 border-card w-24 h-24">
              <AvatarImage src={`http://localhost:3001/${userData.avatarUrl}`} />
            </Avatar>
            <div className="flex p-[5px] bg-primary/5 backdrop-blur-sm rounded-lg">
              <IconBadgesRow badges={userData.badges} />
            </div>
          </div>
        </div>
        <Card className="mt-16 mx-4 mb-4">
          <CardContent className="p-4 space-y-4">
            {[
              { key: 'nickname', label: 'Отображаемое имя' },
              { key: 'username', label: 'Имя пользователя' },
              { key: 'email', label: 'Электронная почта' },
              { key: 'number', label: 'Номер телефона' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-medium">{userData[key as keyof UserData]}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(key as keyof UserData, userData[key as keyof UserData] as string, label)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{label}</DialogTitle>
                      <DialogDescription>
                        Изменение данных пользователя {label.toLowerCase()}.
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder={`Другое(-ая, -ой) ${label.toLowerCase()}`}
                      autoComplete="off"
                    />
                    <div className="mt-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Пароль для подтверждения
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Введите пароль"
                          className="pr-10"
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <DialogFooter>
                      <Button onClick={handleSave}>
                        Сохранить
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}