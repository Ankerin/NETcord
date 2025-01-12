'use client'

import { useEffect, useState } from 'react'

interface FogParticle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function FogEffect() {
  const [particles, setParticles] = useState<FogParticle[]>([])

  useEffect(() => {
    const newParticles: FogParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 20,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.1
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speed) % 100,
          opacity: 0.1 + Math.sin(Date.now() / 1000 + particle.id) * 0.1
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity}) 0%, rgba(255,255,255,0) 70%)`,
            pointerEvents: 'none'
          }}
        />
      ))}
    </>
  )
}