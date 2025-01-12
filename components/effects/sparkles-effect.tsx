'use client'

import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

export function SparklesEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prevSparkles => {
        const newSparkle: Sparkle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: 1
        }
        return [...prevSparkles.slice(-20), newSparkle]
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prevSparkles =>
        prevSparkles.map(sparkle => ({
          ...sparkle,
          opacity: sparkle.opacity - 0.05
        })).filter(sparkle => sparkle.opacity > 0)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          style={{
            position: 'absolute',
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: sparkle.opacity,
            pointerEvents: 'none'
          }}
        />
      ))}
    </>
  )
}