'use client'

import { useEffect, useState } from 'react'

interface Leaf {
  id: number
  x: number
  y: number
  rotation: number
  size: number
  color: string
  speed: number
}

const leafColors = ['#FFA500', '#FF4500', '#8B4513', '#A0522D', '#D2691E'];

export function AutumnLeavesEffect() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    const newLeaves: Leaf[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotation: Math.random() * 360,
      size: Math.random() * 10 + 5,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      speed: Math.random() * 1 + 0.5
    }))
    setLeaves(newLeaves)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaves(prevLeaves =>
        prevLeaves.map(leaf => ({
          ...leaf,
          y: leaf.y + leaf.speed,
          x: leaf.x + Math.sin(leaf.y * 0.1) * 0.5,
          rotation: leaf.rotation + leaf.speed * 2
        })).filter(leaf => leaf.y < 110)
          .concat(Array.from({ length: 1 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 100,
            y: -10,
            rotation: Math.random() * 360,
            size: Math.random() * 10 + 5,
            color: leafColors[Math.floor(Math.random() * leafColors.length)],
            speed: Math.random() * 1 + 0.5
          })))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          style={{
            position: 'absolute',
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            backgroundColor: leaf.color,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: `rotate(${leaf.rotation}deg)`,
            transition: 'transform 0.5s ease',
            pointerEvents: 'none'
          }}
        />
      ))}
    </>
  )
}