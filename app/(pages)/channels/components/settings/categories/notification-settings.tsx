"use client"

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [soundNotifications, setSoundNotifications] = useState(true)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Настройки уведомлений</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications">Email уведомления</Label>
            <p className="text-sm text-muted-foreground">
              Получать уведомления на электронную почту
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="push-notifications">Push-уведомления</Label>
            <p className="text-sm text-muted-foreground">
              Получать push-уведомления в браузере
            </p>
          </div>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sound-notifications">Звуковые уведомления</Label>
            <p className="text-sm text-muted-foreground">
              Воспроизводить звук при получении уведомлений
            </p>
          </div>
          <Switch
            id="sound-notifications"
            checked={soundNotifications}
            onCheckedChange={setSoundNotifications}
          />
        </div>
      </div>
    </div>
  )
}