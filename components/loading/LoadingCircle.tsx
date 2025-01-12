import React from 'react'
import { motion } from 'framer-motion'

const LoadingCircle: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
        {Math.round(progress)}%
      </div>
    </div>
  )
}

export default LoadingCircle