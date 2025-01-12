"use client";

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [activityStatus, setActivityStatus] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="profile-visibility">Видимость профиля</Label>
          <p className="text-sm text-muted-foreground">
            Разрешить другим пользователям видеть ваш профиль
          </p>
        </div>
        <Switch
          id="profile-visibility"
          checked={profileVisibility}
          onCheckedChange={setProfileVisibility}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="activity-status">Статус активности</Label>
          <p className="text-sm text-muted-foreground">
            Показывать ваш онлайн статус другим пользователям
          </p>
        </div>
        <Switch
          id="activity-status"
          checked={activityStatus}
          onCheckedChange={setActivityStatus}
        />
      </div>
      <div className="pt-4">
        <Button variant="destructive">Удалить аккаунт</Button>
        <p className="mt-2 text-sm text-muted-foreground">
          Это действие необратимо. Все ваши данные будут удалены.
        </p>
      </div>
    </div>
  )
}