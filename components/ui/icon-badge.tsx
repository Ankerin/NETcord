'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Shield, Circle, Gem, Sparkles, CodeXml, Braces, TypeIcon as type, LucideIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const iconBadgeVariants = cva(
  "inline-flex items-center justify-center transition-all hover:scale-105 cursor-pointer",
  {
    variants: {
      variant: {
        default: "text-primary/80 hover:text-primary/60",
        gray: "text-gray-400/80 hover:text-gray-300/60",
        blue: "text-blue-500/80 hover:text-blue-400/60",
        purple: "text-purple-500/80 hover:text-purple-400/60",
        amber: "text-amber-500/80 hover:text-amber-400/60",
        red: "text-red-500/80 hover:text-red-400/60",
        pink: "text-pink-500/100 hover:text-pink-500/80",
        green: "text-green-500/80 hover:text-green-400/60",
        teal: "text-teal-500/80 hover:text-teal-400/60",
        yellow: "text-yellow-400/80 hover:text-yellow-300/60",
        custom: "",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      glow: {
        true: "drop-shadow-[0_0_10px_var(--icon-glow-color)]",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      glow: false,
    },
  }
)

const iconShapes = {
  moderator: Shield,
  circle: Circle,
  crystal: Gem,
  netsub: Sparkles,
  devnet: CodeXml,
  dev: Braces,
} as const

export type IconShape = keyof typeof iconShapes
export type IconVariant = NonNullable<VariantProps<typeof iconBadgeVariants>["variant"]>

export interface IconBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof iconBadgeVariants>, "variant"> {
  shape?: IconShape
  variant?: IconVariant
  icon?: LucideIcon
  tooltip?: string
  glowColor?: string
}

function IconBadge({ 
  className, 
  variant = "default", 
  size, 
  shape = "circle",
  icon: CustomIcon,
  tooltip,
  glow,
  glowColor = "rgba(147, 51, 234, 0.5)",
  style,
  ...props 
}: IconBadgeProps) {
  const Icon = CustomIcon || (shape ? iconShapes[shape] : Circle)
  
  const badge = (
    <div 
      className={cn(iconBadgeVariants({ variant, size, glow }), className)}
      style={{ 
        ...style,
        "--icon-glow-color": glowColor 
      } as React.CSSProperties} 
      {...props}
    >
      <Icon />
    </div>
  )

  if (tooltip) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return badge
}

export { IconBadge, iconBadgeVariants }