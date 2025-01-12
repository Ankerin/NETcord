'use client'

import { useEffect, useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

export function StarrySkyEffect() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const newStars: Star[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5
    }))
    setStars(newStars)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prevStars =>
        prevStars.map(star => ({
          ...star,
          opacity: 0.5 + Math.sin(Date.now() / 1000 + star.id) * 0.5
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 50, 0.8)',
          pointerEvents: 'none'
        }}
      />
      {stars.map(star => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: star.opacity,
            pointerEvents: 'none'
          }}
        />
      ))}
    </>
  )
}