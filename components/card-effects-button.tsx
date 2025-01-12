'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sparkles, Cloud, Snowflake, CloudFog, Leaf, Star } from 'lucide-react'
import { Effect } from '@/app/(pages)/channels/components/card/profile-card'

interface CardEffectsButtonProps {
  onEffectChange: (effect: Effect) => void
}

export function CardEffectsButton({ onEffectChange }: CardEffectsButtonProps) {
  const [currentEffect, setCurrentEffect] = useState<Effect>('none')

  const handleEffectChange = (effect: Effect) => {
    setCurrentEffect(effect)
    onEffectChange(effect)
  }

  const getEffectIcon = () => {
    switch (currentEffect) {
      case 'sparkles':
        return <Sparkles className="h-4 w-4 mr-2" />
      case 'clouds':
        return <Cloud className="h-4 w-4 mr-2" />
      case 'snow':
        return <Snowflake className="h-4 w-4 mr-2" />
      case 'fog':
        return <CloudFog className="h-4 w-4 mr-2" />
      case 'autumn-leaves':
        return <Leaf className="h-4 w-4 mr-2" />
      case 'starry-night':
        return <Star className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {getEffectIcon()}
          {currentEffect === 'none' ? 'Выберите эффект' : `Эффект: ${currentEffect}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleEffectChange('sparkles')}>
          <Sparkles className="h-4 w-4 mr-2" /> Искры
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEffectChange('clouds')}>
          <Cloud className="h-4 w-4 mr-2" /> Облака
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEffectChange('snow')}>
          <Snowflake className="h-4 w-4 mr-2" /> Снег
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEffectChange('fog')}>
          <CloudFog className="h-4 w-4 mr-2" /> Туман
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEffectChange('autumn-leaves')}>
          <Leaf className="h-4 w-4 mr-2" /> Осенний листопад
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEffectChange('starry-night')}>
          <Star className="h-4 w-4 mr-2" /> Звездное небо
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEffectChange('none')}>
          Без эффекта
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}