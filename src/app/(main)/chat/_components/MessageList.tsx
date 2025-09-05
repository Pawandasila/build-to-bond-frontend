'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  className?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  className = ""
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      }).format(messageDate);
    }
  };

  const shouldShowDateDivider = (currentMessage: Message, previousMessage?: Message) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp).toDateString();
    const previousDate = new Date(previousMessage.timestamp).toDateString();
    
    return currentDate !== previousDate;
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>;
      case 'sent':
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
      case 'delivered':
        return <div className="w-4 h-4 text-gray-400">✓</div>;
      case 'read':
        return <div className="w-4 h-4 text-blue-500">✓✓</div>;
      case 'failed':
        return <div className="w-4 h-4 text-red-500">!</div>;
      default:
        return null;
    }
  };

  if (messages.length === 0) {
    return (
      <div className={`flex-1 flex items-center justify-center ${className}`}>
        <div className="text-center space-y-2">
          <p className="text-gray-500">No messages yet</p>
          <p className="text-gray-400 text-sm">Start the conversation with a friendly hello!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white ${className}`}>
      <div className="p-3 space-y-3">
        {messages.map((message, index) => {
          const previousMessage = index > 0 ? messages[index - 1] : undefined;
          const showDateDivider = shouldShowDateDivider(message, previousMessage);
          const isOwn = message.senderId === currentUserId;

          return (
            <div key={message.id}>
              {/* Date Divider */}
              {showDateDivider && (
                <div className="flex justify-center my-3">
                  <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {formatDate(message.timestamp)}
                  </div>
                </div>
              )}

              {/* Message */}
              <div
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`max-w-[85%] sm:max-w-[70%] space-y-1 ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* Message Bubble */}
                  <div
                    className={`px-3 py-2.5 rounded-2xl font-sans text-sm leading-relaxed shadow-sm relative group ${
                      isOwn
                        ? 'bg-primary-500 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                    }`}
                  >
                    {/* Reply Context */}
                    {message.replyTo && (
                      <div className={`mb-2 p-2 rounded-lg border-l-4 ${
                        isOwn 
                          ? 'bg-primary-400/30 border-primary-200' 
                          : 'bg-gray-100 border-gray-300'
                      }`}>
                        <p className={`text-xs ${isOwn ? 'text-primary-100' : 'text-gray-500'} mb-1`}>
                          Replying to:
                        </p>
                        <p className={`text-xs ${isOwn ? 'text-white' : 'text-gray-700'} truncate`}>
                          {message.replyTo.content}
                        </p>
                      </div>
                    )}

                    {/* Message Content */}
                    <div>
                      {message.messageType === 'text' && (
                        <span>{message.text}</span>
                      )}
                      
                      {message.messageType === 'image' && message.mediaUrl && (
                        <div className="space-y-2">
                          <Image 
                            src={message.mediaUrl} 
                            alt="Shared image"
                            width={300}
                            height={200}
                            className="max-w-full h-auto rounded-lg"
                          />
                          {message.text && <p>{message.text}</p>}
                        </div>
                      )}
                      
                      {message.messageType === 'voice' && message.mediaUrl && (
                        <div className="flex items-center space-x-2">
                          <audio controls className="max-w-full">
                            <source src={message.mediaUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          {message.duration && (
                            <span className={`text-xs ${isOwn ? 'text-primary-100' : 'text-gray-500'}`}>
                              {Math.floor(message.duration / 60)}:{String(message.duration % 60).padStart(2, '0')}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {message.messageType === 'file' && message.mediaUrl && (
                        <div className="flex items-center space-x-2 p-2 rounded bg-black/10">
                          <div className="flex-1">
                            <p className="font-medium">{message.fileName}</p>
                            {message.fileSize && (
                              <p className={`text-xs ${isOwn ? 'text-primary-100' : 'text-gray-500'}`}>
                                {(message.fileSize / 1024 / 1024).toFixed(2)} MB
                              </p>
                            )}
                          </div>
                          <a 
                            href={message.mediaUrl} 
                            download={message.fileName}
                            className={`text-xs underline ${isOwn ? 'text-primary-100' : 'text-primary-600'}`}
                          >
                            Download
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Edited Indicator */}
                    {message.isEdited && (
                      <span className={`text-xs ${isOwn ? 'text-primary-200' : 'text-gray-400'} ml-2`}>
                        (edited)
                      </span>
                    )}

                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.reactions.map((reaction, idx) => (
                          <div 
                            key={idx}
                            className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${
                              isOwn ? 'bg-primary-400/30' : 'bg-gray-100'
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message Info */}
                  <div className={`flex items-center space-x-2 px-1 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <span className="text-xs text-gray-400">
                      {formatTime(message.timestamp)}
                    </span>
                    
                    {/* Status Indicator (only for own messages) */}
                    {isOwn && (
                      <div className="flex items-center">
                        {getStatusIcon(message.status)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
