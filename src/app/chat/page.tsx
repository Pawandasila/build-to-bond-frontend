"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Phone, Video, Send, Mic, MoreVertical, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Message interface
interface Message {
  id: string
  text: string
  senderId: string
  timestamp: Date
  isOwn: boolean
}

// Chat interface
interface Chat {
  id: string
  name: string
  lastText: string
  avatar?: string
  messages: Message[]
  isOnline?: boolean
}

// Mock chat data with messages
const mockChats: Chat[] = [
  { 
    id: '1', 
    name: 'Sarah Chen', 
    lastText: 'You might just be my favorite notification today 😏',
    isOnline: true,
    messages: [
      { id: '1', text: 'Hey cutie, what are you up to? 😉', senderId: '1', timestamp: new Date(Date.now() - 3600000), isOwn: false },
      { id: '2', text: 'Just waiting for your message… looks like my wish came true 😘', senderId: 'me', timestamp: new Date(Date.now() - 3500000), isOwn: true },
      { id: '3', text: 'You might just be my favorite notification today 😏', senderId: '1', timestamp: new Date(Date.now() - 3400000), isOwn: false }
    ]
  },
  { 
    id: '2', 
    name: 'Mike Rivera', 
    lastText: 'Careful, you are kinda addictive 🔥',
    isOnline: false,
    messages: [
      { id: '4', text: 'You know… I cant stop thinking about our chat earlier 👀', senderId: '2', timestamp: new Date(Date.now() - 7200000), isOwn: false },
      { id: '5', text: 'Good, because I was hoping I was on your mind 😏', senderId: 'me', timestamp: new Date(Date.now() - 7100000), isOwn: true }
    ]
  },
  { 
    id: '3', 
    name: 'Luna Starweaver', 
    lastText: 'You\'ve officially become my favorite distraction 💕',
    isOnline: true,
    messages: [
      { id: '6', text: 'Talking to you feels way more fun than anything else I should be doing right now 😘', senderId: '3', timestamp: new Date(Date.now() - 1800000), isOwn: false }
    ]
  }
]

// Emoji categories with popular emojis
const emojiCategories = {
  smileys: ['😊', '😍', '🥰', '😘', '😉', '😋', '😎', '🤗', '🙈', '😏', '🔥', '💕', '❤️', '💖', '💗', '💙', '💚', '💛', '🧡', '💜'],
  gestures: ['👋', '🤚', '✋', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👍', '👎', '👊', '✊', '🙏'],
  activities: ['🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🌟', '⭐', '✨', '💫', '🔮', '🎯', '🎮', '🎲', '🃏', '🎭', '🎨', '🎪', '🎳', '🎸'],
  nature: ['🌺', '🌸', '🌼', '🌻', '🌷', '🌹', '🏵️', '💐', '🌿', '☘️', '🍀', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌙', '☀️', '🌈'],
  food: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒', '🌶️']
}

// Emoji Picker Component
const EmojiPicker = ({ onEmojiSelect, onClose }: { onEmojiSelect: (emoji: string) => void, onClose: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof emojiCategories>('smileys')

  return (
    <div className="absolute bottom-16 left-0 bg-white border border-base-200 rounded-2xl shadow-xl p-4 w-80 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-sans font-medium text-base-700">Add Emoji</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-base-500 hover:text-base-700">
          ✕
        </Button>
      </div>
      
      {/* Category Tabs */}
      <div className="flex space-x-1 mb-3 border-b border-base-100 pb-2">
        {Object.entries(emojiCategories).map(([category, emojis]) => (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategory(category as keyof typeof emojiCategories)}
            className={`px-3 py-1 text-lg ${
              selectedCategory === category 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-base-500 hover:text-base-700'
            }`}
          >
            {emojis[0]}
          </Button>
        ))}
      </div>
      
      {/* Emoji Grid */}
      <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
        {emojiCategories[selectedCategory].map((emoji, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => {
              onEmojiSelect(emoji)
              onClose()
            }}
            className="h-8 w-8 p-0 text-lg hover:bg-primary-50 rounded-lg"
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  )
}

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  const hasChats = chats.length > 0

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedChat?.messages])

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji)
  }

  // Send message functionality
  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      senderId: 'me',
      timestamp: new Date(),
      isOwn: true
    }

    // Update the selected chat with new message
    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat.id) {
        const updatedChat = {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastText: message.trim()
        }
        setSelectedChat(updatedChat)
        return updatedChat
      }
      return chat
    })

    setChats(updatedChats)
    setMessage('')

    // Simulate response after 1-2 seconds
    setTimeout(() => {
      const responses = [
       "You have such a beautiful vibe, I feel drawn to you ",
        "I'm really glad we matched, it feels special ",
       "Your words make me smile more than you know ",
       "Thank you for sharing that, it really shows your genuine side ",
       "I can already feel a spark between us "
      ]
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        senderId: selectedChat.id,
        timestamp: new Date(),
        isOwn: false
      }

      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === selectedChat.id) {
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, responseMessage],
            lastText: responseMessage.text
          }
          setSelectedChat(updatedChat)
          return updatedChat
        }
        return chat
      }))
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Navbar */}
      <nav className="border-b border-base-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="px-6 py-2 flex items-center justify-between">
          <h1 className="font-marcellus text-2xl text-primary-700">
            Soul<span className="text-primary-500">ara</span>
          </h1>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Enhanced Left Sidebar - Chat List */}
        {hasChats && (
          <div className="w-130 border-r border-base-200 bg-background flex flex-col">
            {/* Chat List Header */}
            <div className="p-4 border-b border-base-200 bg-base-25">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-sans font-semibold text-base-800">Messages</h2>
               
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-base-200 rounded-lg bg-background text-base-700 placeholder-base-400 focus:outline-none focus:ring-2 focus:ring-primary-300 font-sans text-sm"
                />
              </div>
            </div>
            
            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b border-base-100 cursor-pointer transition-all duration-200 hover:bg-base-50 relative ${
                    selectedChat?.id === chat.id ? 'bg-primary-50 border-l-4 border-l-primary-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center shadow-sm">
                        <span className="font-sans font-semibold text-primary-700 text-sm">
                          {chat.name[0]}
                        </span>
                      </div>
                      {chat.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-sans font-semibold text-base-800 truncate">
                          {chat.name}
                        </h3>
                        <span className="text-xs text-base-400">
                          {formatTime(chat.messages[chat.messages.length - 1]?.timestamp || new Date())}
                        </span>
                      </div>
                      <p className="text-sm text-base-600 truncate font-sans">
                        {chat.lastText}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Enhanced Chat Header */}
              <div className="p-4 border-b border-base-200 bg-background/95 backdrop-blur flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                      <span className="font-sans font-semibold text-primary-700 text-sm">
                        {selectedChat.name[0]}
                      </span>
                    </div>
                    {selectedChat.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-base-800">
                      {selectedChat.name}
                    </h3>
                    <p className="text-xs text-base-500">
                      {selectedChat.isOnline ? 'Online now' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="text-base-600 hover:text-primary-600 hover:bg-primary-50">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-base-600 hover:text-primary-600 hover:bg-primary-50">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-base-600 hover:text-primary-600 hover:bg-primary-50"
                    onClick={() => setSelectedChat(null)}
                    aria-label="Close chat"
                  >
                    <span className="sr-only">Close chat</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8"
                    >
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-b from-base-25 to-base-50/50">
                <div className="p-4 space-y-4">
                  {selectedChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div className={`max-w-[70%] space-y-1 ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div
                          className={`px-4 py-3 rounded-2xl font-sans text-sm leading-relaxed shadow-sm ${
                            msg.isOwn
                              ? 'bg-primary-500 text-white rounded-br-md'
                              : 'bg-white text-base-800 rounded-bl-md border border-base-200'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-xs text-base-400 px-1">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Enhanced Message Input */}
              <div className="p-4 border-t border-base-200 bg-background/95 backdrop-blur">
                <div className="flex items-end space-x-3 relative" ref={emojiPickerRef}>
                  {/* Plus/Emoji Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="h-12 w-12 rounded-full text-base-500 hover:text-primary-600 hover:bg-primary-50 flex-shrink-0"
                    aria-label="Add emoji"
                  >
                    <Plus className={`w-5 h-5 transition-transform duration-200 ${showEmojiPicker ? 'rotate-45' : ''}`} />
                  </Button>
                  
                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <EmojiPicker 
                      onEmojiSelect={handleEmojiSelect}
                      onClose={() => setShowEmojiPicker(false)}
                    />
                  )}
                  
                  <div className="flex-1 relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="waiting for your messages..."
                      rows={1}
                      className="w-full px-4 py-3 pr-12 border border-base-200 rounded-2xl bg-white text-base-800 placeholder-base-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 font-sans resize-none transition-all duration-200 shadow-sm"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-500 hover:text-primary-600 hover:bg-primary-50 p-2"
                        onClick={async () => {
                            if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
                                alert('Speech recognition is not supported in this browser.')
                                return
                            }
                            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
                            const recognition = new SpeechRecognition()
                            recognition.lang = 'en-US'
                            recognition.interimResults = false
                            recognition.maxAlternatives = 1

                            recognition.onresult = (event: any) => {
                                const transcript = event.results[0][0].transcript
                                setMessage(prev => prev ? prev + ' ' + transcript : transcript)
                            }
                            recognition.onerror = () => {
                                alert('Speech recognition error.')
                            }
                            recognition.start()
                        }}
                        aria-label="Record message"
                    >
                        <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="h-12 w-12 rounded-full bg-primary-500 hover:bg-primary-600 disabled:bg-base-200 disabled:text-base-400 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Enhanced Default State */
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-base-25 via-primary-25 to-base-50">
              <div className="max-w-lg text-center space-y-8 px-6">
                {/* Enhanced Doodle Image */}
                <img 
                  src="/messages_trans.png" 
                  alt="Messages illustration"
                  className="w-100 h-150 mx-auto object-contain"
                />

                {/* Enhanced Action Button */}
                {!hasChats && (
                  <div className="space-y-4">
                    <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-sans px-8 py-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
                      Find Your Soul Connection
                    </Button>
                    <p className="text-sm text-base-500 font-sans">
                      Start by exploring profiles and sending a message to someone who resonates with your soul.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatPage