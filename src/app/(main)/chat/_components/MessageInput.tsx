'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Plus, Image as ImageIcon, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmojiPicker from './EmojiPicker';
import { WindowWithSpeechRecognition } from '../types';

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onVoiceRecord?: (audioBlob: Blob) => void;
  onImageSelect?: (file: File) => void;
  onFileSelect?: (file: File) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  onMessageChange,
  onSendMessage,
  onVoiceRecord: _onVoiceRecord, // Prefix with underscore to indicate intentionally unused
  onImageSelect,
  onFileSelect,
  disabled = false,
  placeholder = "Type a message...",
  className = ""
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const attachMenuRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (attachMenuRef.current && !attachMenuRef.current.contains(event.target as Node)) {
        setShowAttachMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    onMessageChange(message + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const handleVoiceRecord = async () => {
    const windowWithSpeech = window as WindowWithSpeechRecognition;
    
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not available.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onMessageChange(message ? message + ' ' + transcript : transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      alert('Speech recognition error occurred.');
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleImageSelect = () => {
    imageInputRef.current?.click();
    setShowAttachMenu(false);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
    setShowAttachMenu(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageSelect) {
      onImageSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className={`p-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm ${className}`}>
      <div className="flex items-end space-x-3 relative">
        {/* Attachment Menu */}
        <div className="relative" ref={attachMenuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className={`h-10 w-10 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 flex-shrink-0 transition-all duration-200 ${
              showAttachMenu ? 'rotate-45 bg-primary-50 text-primary-600' : ''
            }`}
            aria-label="Attach file"
          >
            <Plus className="w-5 h-5" />
          </Button>
          
          {/* Attachment Dropdown */}
          {showAttachMenu && (
            <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 min-w-[160px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleImageSelect}
                className="w-full justify-start space-x-2 text-gray-700 hover:bg-gray-50"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photo</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFileSelect}
                className="w-full justify-start space-x-2 text-gray-700 hover:bg-gray-50"
              >
                <Paperclip className="w-4 h-4" />
                <span>File</span>
              </Button>
            </div>
          )}
        </div>

        {/* Emoji Picker */}
        <div className="relative" ref={emojiPickerRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="h-10 w-10 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 flex-shrink-0"
            aria-label="Add emoji"
          >
            😊
          </Button>
          
          {showEmojiPicker && (
            <EmojiPicker 
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
        </div>
        
        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-sans resize-none transition-all duration-200 shadow-sm text-sm max-h-32 overflow-y-auto"
          />
          
          {/* Voice Record Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceRecord}
            disabled={disabled}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 p-2 ${
              isRecording ? 'text-red-500 animate-pulse' : ''
            }`}
            aria-label="Record message"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim() || disabled}
          size="sm"
          className="h-10 w-10 rounded-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 disabled:text-gray-400 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 flex-shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;
