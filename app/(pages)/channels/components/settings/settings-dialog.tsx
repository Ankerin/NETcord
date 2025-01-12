"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { AccountSettings, SettingsSidebar, NotificationSettings, PrivacySettings, ProfileSettings, VoiceSettings, VideoSettings } from "./categories"
import { Separator } from '@/components/ui/separator'

const settingsComponents: { [key: string]: React.ComponentType } = {
  account: AccountSettings,
  notifications: NotificationSettings,
  privacy: PrivacySettings,
  profile: ProfileSettings,
  voice: VoiceSettings,
  video: VideoSettings,
}

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [activeCategory, setActiveCategory] = useState('account')
  const [searchQuery, setSearchQuery] = useState("")

  const SelectedSettingsComponent = settingsComponents[activeCategory as keyof typeof settingsComponents]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-[calc(100vh-2rem)] mt-4 p-0 overflow-hidden bg-background">
        <div className="flex h-full bg-background">
          <div className="relative z-50 w-56 border-r border-border space-y-1">
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск настроек..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Separator className='-translate-y-1'/>
            <SettingsSidebar 
              searchQuery={searchQuery}
              onCategoryChange={setActiveCategory}
              currentCategory={activeCategory}
            />
          </div>
          <div className="flex-1 overflow-auto">
            <div className="p-4">
              <SelectedSettingsComponent />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}