'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from 'lucide-react'
import { format, parse } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DialogCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  onDateSelect: (date: Date) => void
  onUsernameChange: (username: string) => void
  onNicknameChange: (nickname: string) => void
  onSubmit: () => void
  selectedDate: Date | null
  username: string
  nickname: string
}

export function DialogCalendar({ 
  isOpen, 
  onClose, 
  onDateSelect, 
  onUsernameChange,
  onNicknameChange,
  onSubmit, 
  selectedDate,
  username,
  nickname
}: DialogCalendarProps) {
  const [date, setDate] = React.useState<Date | null>(selectedDate)
  const [inputValue, setInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [selectionStart, setSelectionStart] = React.useState<number | null>(null)
  const [selectionEnd, setSelectionEnd] = React.useState<number | null>(null)

  // Format input value with slashes
  const formatDateInput = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 8)
    if (numbers.length === 0) return ''
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`
  }

  // Handle input changes
  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = formatDateInput(value)
    setInputValue(formattedValue)

    // Try to parse the date if we have a complete value
    if (formattedValue.length === 10) {
      try {
        const parsedDate = parse(formattedValue, 'dd/MM/yyyy', new Date())
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate) // Update the calendar state
          onDateSelect(parsedDate) // Notify parent component
        }
      } catch (error) {
        console.error('Invalid date format')
      }
    } else {
      // Clear the date if the input is not complete
      setDate(null)
    }
  }

  // Handle calendar selection
  const handleCalendarSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setInputValue(format(newDate, 'dd/MM/yyyy'))
      onDateSelect(newDate)
    }
  }

  // Handle click to select date segments
  const handleDateClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const value = input.value
    if (!value) return

    const cursorPosition = input.selectionStart || 0
    
    // Determine which segment was clicked
    if (cursorPosition <= 2) {
      input.setSelectionRange(0, 2) // Day
    } else if (cursorPosition <= 5) {
      input.setSelectionRange(3, 5) // Month
    } else {
      input.setSelectionRange(6, 10) // Year
    }
  }

  // Handle key navigation between segments
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const start = input.selectionStart || 0
    const end = input.selectionEnd || 0

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      
      // Define segments
      const segments = [[0, 2], [3, 5], [6, 10]]
      const currentSegment = segments.findIndex(([s, e]) => start >= s && end <= e)
      
      if (currentSegment !== -1) {
        const nextSegment = e.key === 'ArrowRight' 
          ? segments[Math.min(currentSegment + 1, segments.length - 1)]
          : segments[Math.max(currentSegment - 1, 0)]
        
        input.setSelectionRange(nextSegment[0], nextSegment[1])
      }
    }
  }

  // Update input value when selectedDate changes
  React.useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate)
      setInputValue(format(selectedDate, 'dd/MM/yyyy'))
    }
  }, [selectedDate])

  // Restore selection after input update
  React.useEffect(() => {
    if (selectionStart !== null && selectionEnd !== null && inputRef.current) {
      inputRef.current.setSelectionRange(selectionStart, selectionEnd)
    }
  }, [inputValue, selectionStart, selectionEnd])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Дополнительная информация</DialogTitle>
          <DialogDescription>
            Укажите ваше имя пользователя, никнейм и дату рождения для регистрации на платформе.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Label
                htmlFor="username"
                className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
              >
                Пароль
              </Label>
              <Input
                id="username"
                placeholder="netcord"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Label
                htmlFor="nickname"
                className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
              >
                Никнейм
              </Label>
              <Input
                id="nickname"
                placeholder="NETcord"
                value={nickname}
                onChange={(e) => onNicknameChange(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Label
                htmlFor="birth-day"
                className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
              >
                Дата рождения
              </Label>
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  id="birthdate"
                  value={inputValue}
                  onChange={handleDateInput}
                  onClick={handleDateClick}
                  onKeyDown={handleKeyDown}
                  placeholder="ДД/ММ/ГГГГ"
                  className="flex-1"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-10 p-0"
                      type="button"
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date || undefined}
                      onSelect={handleCalendarSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={!date || !username || !nickname}
            >
              Продолжить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}