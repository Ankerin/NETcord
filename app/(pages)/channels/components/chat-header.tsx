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

export function ClientHeader() {
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
    <div className="sticky bg-background top-0 shadow-sm z-10">
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

export function Header() {
  return <ClientHeader />
}