'use client'

import * as React from 'react'
import { HexColorPicker } from "react-colorful"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { EyeIcon as Eyedropper } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  type: 'primary' | 'accent'
}

export function ColorPicker({ color, onChange, type }: ColorPickerProps) {
  const [localColor, setLocalColor] = React.useState(color)

  React.useEffect(() => {
    setLocalColor(color)
  }, [color])

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor)
    onChange(newColor)
  }

  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  const isDark = getLuminance(localColor) < 0.5

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-[60px] h-[60px] p-0 relative"
                  style={{ backgroundColor: localColor }}
                >
                  <Eyedropper 
                    className={`h-4 w-4 absolute top-2 right-2 ${isDark ? 'text-white' : 'text-gray-500'}`} 
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3" align="start">
                <HexColorPicker color={localColor} onChange={handleColorChange} />
                <div className="grid grid-cols-5 gap-1 mt-3">
                  {['#1a1a1a', '#2d2d2d', '#404040', '#525252', '#666666'].map((presetColor) => (
                    <Button
                      key={presetColor}
                      className="w-6 h-6 p-0"
                      style={{ backgroundColor: presetColor }}
                      onClick={() => handleColorChange(presetColor)}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{type === 'primary' ? 'Primary Color' : 'Accent Color'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}