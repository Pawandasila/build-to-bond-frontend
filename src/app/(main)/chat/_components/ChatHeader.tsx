'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatUser } from '../types';

interface ChatHeaderProps {
  user: ChatUser;
  onBack?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMoreOptions?: () => void;
  showBackButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  user,
  onBack,
  onCall,
  onVideoCall,
  onMoreOptions,
  showBackButton = false
}) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="md:hidden text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-full"
            aria-label="Back to chat list"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}

        {/* User Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center shadow-sm">
            {user.profilePicture ? (
              <Image 
                src={user.profilePicture} 
                alt={`${user.firstName} ${user.lastName}`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="font-semibold text-primary-700 text-sm">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            )}
          </div>
          {user.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          )}
        </div>

        {/* User Info */}
        <div>
          <h3 className="font-semibold text-gray-800 text-base">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500">
            {user.isOnline ? (
              <span className="text-green-500">Online now</span>
            ) : (
              'Last seen recently'
            )}
          </p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCall}
          className="text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2"
          aria-label="Voice call"
        >
          <Phone className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onVideoCall}
          className="text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2"
          aria-label="Video call"
        >
          <Video className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onMoreOptions}
          className="text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2"
          aria-label="More options"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
