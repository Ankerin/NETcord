'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
}

interface Satellite {
  x: number
  y: number
  angle: number
  speed: number
  size: number
}

export default function LoadingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const satellitesRef = useRef<Satellite[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const particleCount = 100
    const satelliteCount = 3
    particlesRef.current = []
    satellitesRef.current = []

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    for (let i = 0; i < satelliteCount; i++) {
      satellitesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.5,
        size: Math.random() * 50 + 50
      })
    }

    const drawSatellite = (satellite: Satellite) => {
      const satelliteEndX = satellite.x + Math.cos(satellite.angle) * satellite.size
      const satelliteEndY = satellite.y + Math.sin(satellite.angle) * satellite.size

      // Основная линия спутника
      ctx.beginPath()
      ctx.moveTo(satellite.x, satellite.y)
      ctx.lineTo(satelliteEndX, satelliteEndY)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Главная точка спутника
      ctx.beginPath()
      ctx.arc(satellite.x, satellite.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'white'
      ctx.fill()

      // Конечная точка спутника
      ctx.beginPath()
      ctx.arc(satelliteEndX, satelliteEndY, 4, 0, Math.PI * 2)
      ctx.fill()

      // Поперечные линии для детализации
      const midX = (satellite.x + satelliteEndX) / 2
      const midY = (satellite.y + satelliteEndY) / 2

      ctx.beginPath()
      ctx.moveTo(midX, midY - 5)
      ctx.lineTo(midX, midY + 5)
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        if (!isPaused) {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fill()
      })

      satellitesRef.current.forEach(satellite => {
        if (!isPaused) {
          satellite.x += Math.cos(satellite.angle) * satellite.speed
          satellite.y += Math.sin(satellite.angle) * satellite.speed

          if (satellite.x < -satellite.size) satellite.x = canvas.width + satellite.size
          if (satellite.x > canvas.width + satellite.size) satellite.x = -satellite.size
          if (satellite.y < -satellite.size) satellite.y = canvas.height + satellite.size
          if (satellite.y > canvas.height + satellite.size) satellite.y = -satellite.size
        }

        drawSatellite(satellite)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [isPaused])

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setProgress(prev => (prev + 1) % 101)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        setIsPaused(prev => !prev)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isPaused) {
        setMousePos({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isPaused])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="z-10 flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center">
          <div className="text-white font-semibold">{Math.round(progress)}</div>
        </div>
        <div className="w-64 relative">
          <motion.div 
            className="absolute inset-0 rounded-full"
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <Progress value={progress} className="w-full relative z-10" />
        </div>
      </div>
    </motion.div>
  )
}