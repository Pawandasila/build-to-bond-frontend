"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface VibeCoinDisplayProps {
  coins: number
  className?: string
}

const VibeCoinDisplay = ({ coins, className }: VibeCoinDisplayProps) => {
  return (
    <div className={cn(
      "flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full border border-primary-300",
      className
    )}>
      {/* Coin Icon */}
      <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-sm">
        <svg 
          className="w-3 h-3 text-yellow-900" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm1-10H9v2H7v2h2v2h2v-2h2V8h-2V6z"/>
        </svg>
      </div>
      
      {/* Coin Count */}
      <span className="text-sm font-semibold text-primary-800 min-w-[2rem] text-center">
        {coins.toLocaleString()}
      </span>
      
      {/* Label */}
      <span className="text-xs text-primary-700 hidden sm:block">VibeCoins</span>
    </div>
  )
}

export default VibeCoinDisplay
