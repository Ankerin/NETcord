'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { IconBadgesRow } from "./icon-badges-row"
import { SparklesEffect } from '@/components/effects/sparkles-effect'
import { CloudsEffect } from '@/components/effects/clouds-effect'
import { SnowEffect } from '@/components/effects/snow-effect'
import { FogEffect } from '@/components/effects/fog-effect'
import { AutumnLeavesEffect } from '@/components/effects/autumn-leaves-effect'
import { StarrySkyEffect } from '@/components/effects/starry-sky-effect'
import { UserData, Effect } from '@/types/types'

interface ProfileCardProps {
  user: UserData
  onSettingsClick: () => void
}

export function ProfileCard({ user, onSettingsClick }: ProfileCardProps) {
  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255
  }

  const getTextColor = (bgColor: string) => {
    return getLuminance(bgColor) > 0.5 ? '#000000' : '#ffffff'
  }

  const darkenColor = (hex: string, amount: number) => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = Math.max(0, (rgb >> 16) - amount)
    const g = Math.max(0, ((rgb >> 8) & 0x00ff) - amount)
    const b = Math.max(0, (rgb & 0x0000ff) - amount)
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  const isExtremeColor = (hex: string) => {
    return hex === '#000000' || hex === '#ffffff'
  }

  const primaryLuminance = getLuminance(user.profile.primaryColor)
  const accentLuminance = getLuminance(user.profile.accentColor)

  const darkerPrimary = darkenColor(user.profile.primaryColor, 150)
  const darkerAccent = darkenColor(user.profile.accentColor, 150)
  const evenDarkerPrimary = darkenColor(user.profile.primaryColor, 200)
  const evenDarkerAccent = darkenColor(user.profile.accentColor, 200)

  const gradientRatio = Math.min(Math.max((primaryLuminance - accentLuminance + 1) / 2, 0.1), 0.9)

  const getGradient = (color1: string, color2: string) => {
    return `linear-gradient(to bottom, ${color1} 0%, ${color1} ${gradientRatio * 100}%, ${color2} 100%)`
  }

  const containerStyle = {
    position: 'relative' as const,
    borderRadius: '8px',
    padding: '4px',
    background: getGradient(evenDarkerPrimary, evenDarkerAccent),
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      padding: '4px',
      borderRadius: 'inherit',
      background: getGradient(evenDarkerPrimary, evenDarkerAccent),
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'exclude',
    }
  }

  const contentStyle = {
    background: getGradient(darkerPrimary, darkerAccent),
    borderRadius: '6px',
    overflow: 'hidden',
  }

  const avatarBorderStyle = {
    background: getGradient(darkerPrimary, darkerPrimary),
    padding: '4px',
    borderRadius: '100%',
    display: 'inline-block',
  }

  const getButtonColor = () => {
    if (isExtremeColor(user.profile.primaryColor)) {
      return { backgroundColor: '#808080', color: '#ffffff' }
    }

    const buttonBg = darkenColor(user.profile.primaryColor, 200)
    const textColor = getTextColor(buttonBg)

    return { 
      backgroundColor: buttonBg,
      color: textColor,
      border: '1px solid rgba(255,255,255,0.1)'
    }
  }

  const buttonColor = getButtonColor()
  const textColor = getTextColor(darkerPrimary)

  return (
    <div className="w-full max-w-[310px]" style={containerStyle}>
      <div style={contentStyle}>
        <div className="relative">
          <div className="h-[100px] w-full overflow-hidden">
            <img src={user.profile.bannerUrl} alt="Profile banner" className="w-full h-full object-cover" />
          </div>
          <div className="absolute z-10 overflow-hidden -bottom-10 left-3 flex items-end gap-3">
            <div style={avatarBorderStyle}>
              <Avatar className='size-20 object-cover'>
                <AvatarImage src={user.profile.avatarUrl} />
              </Avatar>
            </div>
            <div className="inline-flex items-center px-2 py-1 bg-black/50 rounded-md">
              <IconBadgesRow badges={user.badges}/>
            </div>
          </div>
        </div>
        <div className="pt-12 p-4 space-y-1">
          <div>
            <div className='flex items-center'>
              <h2 className="text-lg font-semibold" style={{ color: textColor }}>{user.account.nickname}</h2>
            </div>
            <div className="flex items-center text-sm space-x-2" style={{ color: textColor + '99' }}>
              <span>{user.account.username}</span>
            </div>
          </div>
          <Button variant="default" className="w-full" style={buttonColor} onClick={onSettingsClick}>
            Настройки
          </Button>
        </div>
        {user.profile.effect !== 'none' && (
          <div className="absolute inset-0 overflow-hidden rounded-[12px] pointer-events-none">
            {user.profile.effect === 'sparkles' && <SparklesEffect />}
            {user.profile.effect === 'clouds' && <CloudsEffect />}
            {user.profile.effect === 'snow' && <SnowEffect />}
            {user.profile.effect === 'fog' && <FogEffect />}
            {user.profile.effect === 'autumn-leaves' && <AutumnLeavesEffect />}
            {user.profile.effect === 'starry-night' && <StarrySkyEffect />}
          </div>
        )}
      </div>
    </div>
  )
}