'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquare, Search, Bell, Inbox, Users, Gamepad2, Pin, Archive, MessageSquareText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AnimatePresence, motion } from "framer-motion"
import { ProjectBanner } from '@/components/project-banner'
import { API_BASE_URL, API_KEY } from '@/app/config/config'

function getCurrentUserId(): string {
  // Implement this function to return the current user's ID
  return "user-id-placeholder"
}

export function ClientServerHeader() {
  const [activeTab, setActiveTab] = useState('inbox')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})

  const checkEmailVerification = async () => {
    try {
      const token = localStorage.getItem('auth_token') // Assuming you store the JWT token in localStorage
      const response = await fetch(`${API_BASE_URL}/api/verify-email`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setIsEmailVerified(data.isVerified);
      } else {
        console.error('Failed to check email verification status');
      }
    } catch (error) {
      console.error('Error checking email verification:', error);
    }
  };

  useEffect(() => {
    const setIndicatorPosition = () => {
      const activeElement = tabsRef.current?.querySelector(`[data-state="active"]`)
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement as HTMLElement
        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }

    setIndicatorPosition()
    window.addEventListener('resize', setIndicatorPosition)
    return () => window.removeEventListener('resize', setIndicatorPosition)
  }, [activeTab])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    checkEmailVerification();
  }, []);

  const openEmailVerificationDialog = () => {
    // Implement the logic to open the email verification dialog
    console.log('Opening email verification dialog');
  };

  return (
    <div className="sticky bg-black top-0 bg-background shadow-sm z-10">
      <header className="flex p-2 items-center justify-between gap-2 border-b px-4 w-full h-[49px]">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <MessageSquareText className="h-4 w-4" />
          <span>казан 🍲</span>
        </div>
        <Separator orientation="vertical" className="h-5" />

        <div className="flex-1 flex items-center justify-end gap-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7">
              <Pin className="h-3 w-3" />
              <span className="sr-only">Закреплённые</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7">
              <Users className="h-3 w-3" />
              <span className="sr-only">Пользователи</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7">
              <Gamepad2 className="h-3 w-3" />
              <span className="sr-only">Игры</span>
            </Button>
          </div>
          <div className="flex max-w-sm items-center">
            <div className={`relative transition-all duration-300 ease-in-out ${
              isInputFocused ? 'sm:w-[120px] md:w-[200px]' : 'w-[120px]'
            }`}>
              <Input
                type="search"
                placeholder="Поиск"
                className="h-7 w-full pr-7 text-sm"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            </div>
          </div>

          <Separator orientation="vertical" className="h-5" />

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Bell className="h-3 w-3" />
              <span className="sr-only">Уведомления</span>
            </Button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-popover text-popover-foreground shadow-md rounded-md overflow-hidden"
                >
                  <div className="p-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold">Уведомления</h3>
                      <Button variant="ghost" size="sm">
                        Отметить все как прочитанные
                      </Button>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant={activeTab === 'inbox' ? 'secondary' : 'ghost'}
                        onClick={() => setActiveTab('inbox')}
                      >
                        <Inbox className="h-3 w-3 mr-1" />
                        Входящие
                      </Button>
                      <Button
                        size="sm"
                        variant={activeTab === 'archive' ? 'secondary' : 'ghost'}
                        onClick={() => setActiveTab('archive')}
                      >
                        <Archive className="h-3 w-3 mr-1" />
                        Архив
                      </Button>
                      <Button
                        size="sm"
                        variant={activeTab === 'comments' ? 'secondary' : 'ghost'}
                        onClick={() => setActiveTab('comments')}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Комментарии
                      </Button>
                    </div>
                  </div>
                  <div className="min-h-[300px] flex items-center justify-center p-4">
                    {activeTab === 'inbox' && (
                      <div className="text-center">
                        <Inbox className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Нет новых уведомлений</p>
                      </div>
                    )}
                    {activeTab === 'archive' && (
                      <div className="text-center">
                        <Archive className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Архив пуст</p>
                      </div>
                    )}
                    {activeTab === 'comments' && (
                      <div className="text-center">
                        <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Нет комментариев</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      {!isEmailVerified && (
        <ProjectBanner
          variant="error"
          label="Необходимо подтвердить адрес электронной почты во избежание удаления аккаунта"
          callToAction={{
            label: 'Подтвердить почту',
            onClick: openEmailVerificationDialog,
          }}
        />
      )}
    </div>
  )
}

export function ServerHeader() {
  return <ClientServerHeader />
}