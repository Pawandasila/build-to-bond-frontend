"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface ProfileAvatarProps {
  src?: string
  name: string
  isOnline?: boolean
  className?: string
  onClick?: () => void
}

const ProfileAvatar = ({ src, name, isOnline = false, className, onClick }: ProfileAvatarProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative group transition-transform duration-200 hover:scale-105",
        className
      )}
    >
      <div className="w-8 h-8 rounded-full border-2 border-primary-200 group-hover:border-primary-400 transition-colors overflow-hidden bg-primary-100 flex items-center justify-center">
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-primary-800 text-sm font-medium">
            {initials}
          </span>
        )}
      </div>
      
      {/* Online indicator */}
      {isOnline && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
      )}
    </button>
  )
}

export default ProfileAvatar
