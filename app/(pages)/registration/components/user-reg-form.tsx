'use client'

import * as React from "react"
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogCalendar } from "./reg/dialog-reg"
import { Toasts } from "../toasts"
import { Eye, EyeOff } from 'lucide-react'
import { EmailInput } from "./EmailInput"
import { PhoneInput } from "./PhoneInput"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingTriangle } from '@/components/loading/LoadingTriangle'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

if (!API_URL || !API_KEY) {
  throw new Error('Missing required environment variables')
}

export function UserRegForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const [number, setNumber] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [confirmPassword, setConfirmPassword] = React.useState<string>("")
  const [isConfirmDialogOpen, setConfirmDialogOpen] = React.useState(false)
  const [username, setUsername] = React.useState<string>("")
  const [nickname, setNickname] = React.useState<string>("")
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const [birthDate, setBirthDate] = React.useState<Date | null>(null)
  const toggleVisibility = () => setIsVisible((prevState) => !prevState)
  const { showRegistrationErrorToast, showPasswordMismatchToast } = Toasts()

  const handleInitialSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (validateForm()) {
      setConfirmDialogOpen(true)
    }
  }

  const validateForm = () => {
    if (!email || !number || !password || !confirmPassword) {
      return false
    }
    if (password !== confirmPassword) {
      showPasswordMismatchToast()
      return false
    }
    return true
  }

  const handleFinalSubmit = async () => {
    setConfirmDialogOpen(false)
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY || ''
        },
        body: JSON.stringify({
          email,
          number,
          password,
          username,
          nickname,
          birthDate
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Registration: ${errorData.message || `Failed with status ${response.status}`}`)
      }

      const data = await response.json()
      router.push(`/channels/`)
    } catch (error) {
      showRegistrationErrorToast()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn("w-full max-w-4xl", className)} {...props}>
      <CardContent className="p-0">
        <div className="grid grid-cols-2">
          <div className="p-6 flex flex-col items-center justify-center min-h-[500px]">
            <div className="relative bottom-10 text-2xl font-semibold tracking-tight text-balance text-center leading-loose md:text-left">
              <a className="text-primary">NET</a>cord
            </div>
            <div className="w-full">
              <form onSubmit={handleInitialSubmit} className="space-y-6 ">
                <EmailInput
                  value={email}
                  onChange={setEmail}
                  disabled={isLoading}
                />
                <PhoneInput
                  value={number}
                  onChange={setNumber}
                  disabled={isLoading}
                />
                <div className="group relative">
                  <Label
                    className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-card px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
                  >
                    Пароль
                  </Label>
                  <div className="relative">
                    <Input
                      className="pe-9"
                      type={isVisible ? "text" : "password"}
                      id="password"
                      placeholder="Пароль"
                      disabled={isLoading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="group relative">
                  <Label
                    className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-card px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
                  >
                    Подтверждение пароля
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      className="pe-9"
                      placeholder="Подтверждение пароля"
                      type={isVisible ? "text" : "password"}
                      disabled={isLoading}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Регистрация
                </Button>
              </form>
            </div>

            <div className="mt-4 text-center text-sm">
              <span 
                className="text-muted-foreground cursor-pointer hover:text-primary transition-colors relative inline-block group"
                onClick={() => router.push('/login')}
              >
                Авторизоваться
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
            </div>
          </div>
          <div className="overflow-hidden">
            <LoadingTriangle />
          </div>
        </div>
      </CardContent>

      <DialogCalendar
        isOpen={isConfirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onUsernameChange={setUsername}
        onNicknameChange={setNickname}
        onSubmit={handleFinalSubmit}
        username={username}
        nickname={nickname}
        onDateSelect={setBirthDate}
        selectedDate={birthDate}
      />
    </Card>
  )
}