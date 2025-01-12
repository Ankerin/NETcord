'use client'

import { useEffect, useState } from 'react'

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    const newSnowflakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5
    }))
    setSnowflakes(newSnowflakes)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSnowflakes(prevSnowflakes =>
        prevSnowflakes.map(snowflake => ({
          ...snowflake,
          y: (snowflake.y + snowflake.speed) % 100,
          x: snowflake.x + Math.sin(snowflake.y * 0.1) * 0.2
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {snowflakes.map(snowflake => (
        <div
          key={snowflake.id}
          style={{
            position: 'absolute',
            left: `${snowflake.x}%`,
            top: `${snowflake.y}%`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            borderRadius: '50%',
            backgroundColor: 'white',
            pointerEvents: 'none'
          }}
        />
      ))}
    </>
  )
}