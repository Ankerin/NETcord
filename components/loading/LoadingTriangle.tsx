'use client'

import { useEffect, useRef } from 'react'

interface LoadingTriangleProps {
  className?: string
}

export function LoadingTriangle({ className }: LoadingTriangleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 400

    // Triangle parameters
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const size = 150
    const lineWidth = 2
    const glowWidth = 8
    const cornerRadius = 15

    // Calculate triangle points
    const points = [
      [centerX, centerY - size], // top
      [centerX - size * Math.cos(Math.PI / 6), centerY + size * Math.sin(Math.PI / 6)], // bottom left
      [centerX + size * Math.cos(Math.PI / 6), centerY + size * Math.sin(Math.PI / 6)], // bottom right
    ] as const

    function drawTriangle(offset: number) {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw triangle outline
      ctx.beginPath()
      ctx.moveTo(points[0][0], points[0][1])
      ctx.lineTo(points[1][0], points[1][1])
      ctx.lineTo(points[2][0], points[2][1])
      ctx.closePath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Calculate current position
      const totalLength = size * 3
      const currentLength = (offset * totalLength) % totalLength
      let currentPoint = 0
      let currentSideLength = 0

      while (currentLength > size && currentPoint < 2) {
        currentPoint++
        currentSideLength += size
      }

      const startPoint = points[currentPoint]
      const endPoint = points[(currentPoint + 1) % 3]
      const nextPoint = points[(currentPoint + 2) % 3]
      let sideProgress = (currentLength - currentSideLength) / size

      // Smooth corner turning
      let x, y
      if (sideProgress > (size - cornerRadius) / size) {
        const cornerProgress = (sideProgress * size - (size - cornerRadius)) / cornerRadius
        const angleStart = currentPoint * (2 * Math.PI / 3)
        const angleEnd = ((currentPoint + 1) % 3) * (2 * Math.PI / 3)
        const angle = angleStart + (angleEnd - angleStart) * cornerProgress
        x = endPoint[0] + cornerRadius * Math.cos(angle)
        y = endPoint[1] + cornerRadius * Math.sin(angle)
      } else {
        x = startPoint[0] + (endPoint[0] - startPoint[0]) * sideProgress
        y = startPoint[1] + (endPoint[1] - startPoint[1]) * sideProgress
      }

      // Draw glowing line
      ctx.beginPath()
      ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2)
      ctx.fillStyle = 'white'
      ctx.fill()

      // Draw glow effect
      ctx.beginPath()
      ctx.arc(x, y, glowWidth / 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.filter = 'blur(4px)'
      ctx.fill()
      ctx.filter = 'none'
    }

    let offset = 0
    let animationFrameId: number

    function animate() {
      offset = (offset + 0.001) % 1 // Reduced speed
      drawTriangle(offset)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className={`flex items-center justify-center w-full h-full rounded-r-lg bg-background overflow-hidden ${className || ''}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
    </div>
  )
}