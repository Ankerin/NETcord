'use client'

import { useEffect, useState } from 'react'

interface Cloud {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

export function CloudsEffect() {
  const [clouds, setClouds] = useState<Cloud[]>([])

  useEffect(() => {
    const newClouds: Cloud[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      speed: Math.random() * 0.5 + 0.1
    }))
    setClouds(newClouds)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setClouds(prevClouds =>
        prevClouds.map(cloud => ({
          ...cloud,
          x: (cloud.x + cloud.speed) % 100
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          style={{
            position: 'absolute',
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            pointerEvents: 'none'
          }}
        />
      ))}
    </>
  )
}