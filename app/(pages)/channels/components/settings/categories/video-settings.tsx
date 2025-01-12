"use client"

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function VideoSettings() {
  const [enableHD, setEnableHD] = useState(true)
  const [enableAutoFocus, setEnableAutoFocus] = useState(true)
  const [selectedCamera, setSelectedCamera] = useState("default")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Настройки видео</h2>
        <p className="text-sm text-muted-foreground">
          Управляйте настройками видеосвязи
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Камера</Label>
          <Select value={selectedCamera} onValueChange={setSelectedCamera}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите камеру" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Встроенная камера</SelectItem>
              <SelectItem value="external">Внешняя камера</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="hd-video">HD видео</Label>
            <p className="text-sm text-muted-foreground">
              Включить HD качество для видеосвязи
            </p>
          </div>
          <Switch
            id="hd-video"
            checked={enableHD}
            onCheckedChange={setEnableHD}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-focus">Автофокус</Label>
            <p className="text-sm text-muted-foreground">
              Автоматическая фокусировка камеры
            </p>
          </div>
          <Switch
            id="auto-focus"
            checked={enableAutoFocus}
            onCheckedChange={setEnableAutoFocus}
          />
        </div>
      </div>
    </div>
  )
}