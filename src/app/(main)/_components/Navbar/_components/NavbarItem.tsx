"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavbarItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  badge?: string | number
  className?: string
}

const NavbarItem = ({ icon, label, onClick, badge, className }: NavbarItemProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex flex-col items-center justify-center px-3 py-2 min-w-[60px] rounded-lg transition-all duration-200 hover:bg-accent group overflow-hidden",
        className
      )}
    >
      <div className="relative mb-1">
        {icon}
        {badge && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 font-medium text-[10px]">
            {badge}
          </span>
        )}
      </div>
      
      {/* Label */}
      <span className="text-xs font-medium text-center leading-tight">{label}</span>
      
      {/* Animated underline with left-to-right enter and right-to-left exit */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
        <div 
          className={cn(
            "h-full bg-primary transition-all duration-300 ease-out transform",
            isHovered 
              ? "translate-x-0 scale-x-100" 
              : "translate-x-full scale-x-0"
          )}
          style={{
            transformOrigin: isHovered ? 'left' : 'right'
          }}
        />
      </div>
    </button>
  )
}

export default NavbarItem
