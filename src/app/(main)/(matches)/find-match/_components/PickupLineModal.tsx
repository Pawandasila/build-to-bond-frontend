"use client";

import React from "react";
import Image from "next/image";
import { X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PickupLineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PickupLineModal: React.FC<PickupLineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pickupLine = "Guess what I'm wearing? The smile you gave me.🪄✨";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Pickup Line</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Doodle Image */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-48 h-48 bg-white rounded-xl">
              <Image 
                src="/assets/hero/hero-01.png" 
                alt="Cute couple illustration" 
                width={200}
                height={200}
                className="w-full h-full object-contain rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Pickup Line */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-800 font-medium leading-relaxed">
              {pickupLine}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
              onClick={() => {
                // TODO: Generate new pickup line
                console.log("Generate new pickup line");
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Line
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupLineModal;
