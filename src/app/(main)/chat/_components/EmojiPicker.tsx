'use client';

import React from 'react';
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react';
import { Button } from '@/components/ui/button';

interface EmojiPickerComponentProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({ 
  onEmojiSelect, 
  onClose 
}) => {
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    onClose();
  };

  return (
    <div className="absolute bottom-16 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
      <div className="flex justify-between items-center p-3 border-b border-gray-100">
        <h3 className="font-sans font-medium text-gray-700">Add Emoji</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
        >
          ✕
        </Button>
      </div>
      
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        width={320}
        height={400}
        theme={Theme.LIGHT}
        emojiStyle={EmojiStyle.NATIVE}
        previewConfig={{
          showPreview: false
        }}
        searchDisabled={false}
        skinTonesDisabled={false}
        lazyLoadEmojis={true}
      />
    </div>
  );
};

export default EmojiPickerComponent;
