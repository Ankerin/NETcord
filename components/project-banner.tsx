"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertTriangle, ShieldCheck, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

const bannerVariants = cva(
  'flex items-center justify-center text-sm font-medium relative overflow-hidden w-full',
  {
    variants: {
      variant: {
        success: 'bg-green-900 text-green-100',
        warning: 'bg-amber-900 text-amber-100',
        error: 'bg-red-900 text-red-100',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
)

interface ProjectBannerProps extends VariantProps<typeof bannerVariants> {
  label: React.ReactNode
  icon?: React.ReactNode
  callToAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

const iconMap: Record<string, React.ComponentType> = {
  success: ShieldCheck,
  warning: RotateCcw,
  error: AlertTriangle,
}

export function ProjectBanner({
  label,
  icon,
  callToAction,
  variant = 'success',
}: ProjectBannerProps) {
  const IconComponent = (icon ?? iconMap[variant as keyof typeof iconMap]) as React.ElementType
  const validVariant = variant || 'success';  // Обеспечиваем, что variant всегда строка

  return (
    <div
      className={cn(
        bannerVariants({ variant: validVariant }),
        'backdrop-blur-md bg-opacity-0 flex items-center justify-center w-full mx-auto'
      )}
      role="alert"
    >
      {/* Верхняя линия */}
      <div className="absolute top-0 left-0 right-0 h-px bg-opacity-80" 
        style={{ backgroundColor: getLineColor(validVariant) }} 
      />
      
      {/* Центральная цветная прозрачная часть */}
      <div className="flex items-center justify-center space-x-3 relative z-10 px-5 py-4 bg-opacity-40 w-full"
           style={{ backgroundColor: getBackgroundColor(validVariant) }}>
        {IconComponent && React.createElement(IconComponent, { className: "h-5 w-5 shrink-0", "aria-hidden": "true" })}
        <span className="text-center">{label}</span>

        {/* Правый блок: Текст с действием, выровненный по центру */}
        {callToAction && (
          <span
            onClick={callToAction.onClick}
            className={cn(
              "underline text-xs cursor-pointer transition-colors duration-200",
              validVariant === 'success' ? 'text-green-100 hover:text-green-300' :
              validVariant === 'warning' ? 'text-amber-100 hover:text-amber-300' :
              'text-red-100 hover:text-red-300'
            )}
          >
            {callToAction.label}
          </span>
        )}
      </div>

      {/* Нижняя линия */}
      <div className="absolute inset-x-0 bottom-0 h-px" 
        style={{ backgroundColor: getLineColor(validVariant) }} 
      />
    </div>
  )
}

function getLineColor(variant: string) {
  switch (variant) {
    case 'success':
      return 'rgba(34, 197, 94, 0.6)'; // темно-зеленый
    case 'warning':
      return 'rgba(251, 146, 60, 0.6)'; // темно-оранжевый
    case 'error':
      return 'rgba(239, 68, 68, 0.6)'; // темно-красный
    default:
      return 'rgba(34, 197, 94, 0.6)'; // по умолчанию зеленый
  }
}

function getBackgroundColor(variant: string) {
  switch (variant) {
    case 'success':
      return 'rgba(34, 197, 94, 0.2)'; // полупрозрачный зеленый
    case 'warning':
      return 'rgba(251, 146, 60, 0.2)'; // полупрозрачный оранжевый
    case 'error':
      return 'rgba(239, 68, 68, 0.2)'; // полупрозрачный красный
    default:
      return 'rgba(34, 197, 94, 0.2)'; // по умолчанию полупрозрачный зеленый
  }
}

export default function ProjectBanners() {
  return (
    <div className="space-y-4 p-4 max-w-3xl mx-auto">
      <ProjectBanner
        variant="success"
        label="Ваш аккаунт успешно верифицирован"
        callToAction={{
          label: 'Отлично',
          onClick: () => alert('Disable clicked'),
        }}
      />
      <ProjectBanner
        variant="warning"
        label={(
          <>
            Технические работы 22:00-03:00(GMT+3){' '}
            <span className="relative inline-block group">
              <span className="transition-colors duration-200 group-hover:text-amber-300">
                @ankerin
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-px bg-current transform origin-left transition-transform duration-200 scale-x-100 group-hover:scale-x-0"></span>
              <span className="absolute left-0 right-0 bottom-0 h-px bg-amber-300 transform origin-right transition-transform duration-200 scale-x-0 group-hover:scale-x-100"></span>
            </span>
          </>
        )}
        callToAction={{
          label: 'Просмотр',
          onClick: () => alert('Undo Rollback clicked'),
        }}
      />
      <ProjectBanner
        variant="error"
        label="Ошибка оплаты, проверьте свою банковскую карту"
        callToAction={{
          label: 'Платежи',
          onClick: () => alert('Add Credit Card clicked'),
        }}
      />
    </div>
  )
}
