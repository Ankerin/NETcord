"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { TypeIcon as type, LucideIcon } from 'lucide-react'

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        // Color variants
        gray: "border-transparent bg-gray-500 text-white hover:bg-gray-600",
        "gray-subtle": "border-transparent bg-gray-500/20 text-gray-200 hover:bg-gray-500/30",
        blue: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        "blue-subtle": "border-transparent bg-blue-500/20 text-blue-200 hover:bg-blue-500/30",
        purple: "border-transparent bg-purple-500 text-white hover:bg-purple-600",
        "purple-subtle": "border-transparent bg-purple-500/20 text-purple-200 hover:bg-purple-500/30",
        amber: "border-transparent bg-amber-500 text-white hover:bg-amber-600",
        "amber-subtle": "border-transparent bg-amber-500/20 text-amber-200 hover:bg-amber-500/30",
        red: "border-transparent bg-red-500 text-white hover:bg-red-600",
        "red-subtle": "border-transparent bg-red-500/20 text-red-200 hover:bg-red-500/30",
        pink: "border-transparent bg-pink-500 text-white hover:bg-pink-600",
        "pink-subtle": "border-transparent bg-pink-500/20 text-pink-200 hover:bg-pink-500/30",
        green: "border-transparent bg-green-500 text-white hover:bg-green-600",
        "green-subtle": "border-transparent bg-green-500/20 text-green-200 hover:bg-green-500/30",
        teal: "border-transparent bg-teal-500 text-white hover:bg-teal-600",
        "teal-subtle": "border-transparent bg-teal-500/20 text-teal-200 hover:bg-teal-500/30",
        // Special variants
        gradient: "border-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white",
        trial: "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        turborepo: "border-transparent bg-gradient-to-r from-pink-500 to-orange-500 text-white",
        inverted: "border-white/20 bg-white text-gray-900",
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-2.5 text-sm",
        lg: "h-7 px-3 text-base",
      },
      shape: {
        default: "rounded-md",
        rounded: "rounded-full",
        square: "rounded-none",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      shape: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: LucideIcon
}

function Badge({ className, variant, size, shape, icon: Icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, shape }), className)} {...props}>
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }