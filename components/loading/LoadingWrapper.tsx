'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import LoadingAnimation from './loadings/LoadingAnimation'

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Show loading state when route changes
    setIsLoading(true)
    
    // Hide loading state after a short delay
    const timer = setTimeout(() => setIsLoading(false), 500)
    
    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingAnimation key="loading" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}