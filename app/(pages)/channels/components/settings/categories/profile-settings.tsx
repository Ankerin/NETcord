'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ProfileCard } from "../../card/profile-card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ColorPicker } from "../../card/color-picker"
import { ScrollArea } from '@/components/ui/scroll-area'
import { EmojiPicker } from "@/components/emoji-picker"
import { CardEffectsButton } from "@/components/card-effects-button"
import { Effect } from '../../card/profile-card'

export function ProfileSettings() {
  const [primaryColor, setPrimaryColor] = useState("#1a1a1a")
  const [accentColor, setAccentColor] = useState("#404040")
  const [pronouns, setPronouns] = useState('')
  const [about, setAbout] = useState("")
  const [cardEffect, setCardEffect] = useState<Effect>('none')

  return (
    <div className="flex flex-col w-full space-y-3 p-4 md:p-6">
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <CardDescription>Настройте внешний вид вашего профиля</CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardContent className="h-[calc(100vh-12rem)] p-4 md:p-6">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Личная информация</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Местоимения</Label>
                        <div className='relative'>
                          <Textarea 
                            className="mt-2 pr-10 resize-none"
                            value={pronouns}
                            onChange={(e) => {
                              if (e.target.value.length <= 18) {
                                setPronouns(e.target.value)
                              }
                            }}
                            placeholder="Я"
                            maxLength={18}
                          />
                          <div className="absolute bottom-2 right-2 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {pronouns.length}/18
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>О себе</Label>
                        <div className="relative">
                          <Textarea 
                            className="mt-2 pr-10 min-h-[100px]"
                            value={about}
                            onChange={(e) => {
                              if (e.target.value.length <= 150) {
                                setAbout(e.target.value)
                              }
                            }}
                            placeholder="Расскажите о себе"
                            maxLength={150}
                          />
                          <div className="absolute bottom-2 right-2 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {about.length}/150
                            </span>
                            <EmojiPicker 
                              onEmojiSelect={(emoji) => {
                                if (about.length + emoji.length <= 150) {
                                  setAbout(prev => prev + emoji)
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Аватар</Label>
                        <div className="mt-2 flex flex-wrap items-center gap-4">
                          <Button variant="outline">Изменить аватар</Button>
                          <Button variant="outline">Удалить</Button>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <Label>Баннер</Label>
                        <div className="mt-2 flex flex-wrap items-center gap-4">
                          <Button variant="outline">Изменить баннер</Button>
                          <Button variant="outline">Удалить</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Цветовая схема</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <ColorPicker 
                        type="primary"
                        color={primaryColor} 
                        onChange={setPrimaryColor} 
                      />
                      <ColorPicker
                        type="accent"
                        color={accentColor} 
                        onChange={setAccentColor} 
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Эффекты карточки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardEffectsButton onEffectChange={(effect: Effect) => setCardEffect(effect)} />
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="w-full lg:w-[340px] mt-6 lg:mt-0">
          <ProfileCard 
            username="Вася"
            avatarUrl="https://i.pinimg.com/originals/2d/00/e9/2d00e9b361579d16e8af7347b14d9832.gif"
            bannerUrl="/ankerin-banner.gif"
            pronouns={pronouns}
            about={about}
            primaryColor={primaryColor}
            accentColor={accentColor}
            effect={cardEffect}
          />
        </div>
      </div>
    </div>
  )
}