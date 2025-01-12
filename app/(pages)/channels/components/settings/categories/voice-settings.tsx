"use client"

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function VoiceSettings() {
  const [noiseCancellation, setNoiseCancellation] = useState(true)
  const [echoReduction, setEchoReduction] = useState(true)
  const [selectedMicrophone, setSelectedMicrophone] = useState("default")
  const [volume, setVolume] = useState([75])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Настройки голоса</h2>
        <p className="text-sm text-muted-foreground">
          Управляйте настройками микрофона и звука
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Микрофон</Label>
          <Select value={selectedMicrophone} onValueChange={setSelectedMicrophone}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите микрофон" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Встроенный микрофон</SelectItem>
              <SelectItem value="external">Внешний микрофон</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Громкость микрофона</Label>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="noise-cancellation">Шумоподавление</Label>
            <p className="text-sm text-muted-foreground">
              Автоматическое подавление фонового шума
            </p>
          </div>
          <Switch
            id="noise-cancellation"
            checked={noiseCancellation}
            onCheckedChange={setNoiseCancellation}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="echo-reduction">Подавление эха</Label>
            <p className="text-sm text-muted-foreground">
              Уменьшение эха во время разговора
            </p>
          </div>
          <Switch
            id="echo-reduction"
            checked={echoReduction}
            onCheckedChange={setEchoReduction}
          />
        </div>
      </div>
    </div>
  )
}