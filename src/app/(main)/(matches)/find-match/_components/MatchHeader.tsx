"use client";

import { InfoIcon, Heart, Users, FilterIcon } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PickupLineModal from "./PickupLineModal";

interface MatchHeaderProps {
  onFilterClick?: () => void;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ onFilterClick }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userName = user ? `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()}` : "User";

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
      <div className="relative p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-transparent"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
              <Heart className="w-6 h-6 text-primary-600" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary-600">
                  Welcome, {userName}
                </h1>
                <button 
                  className="group relative"
                  onClick={() => setIsModalOpen(true)}
                >
                  <InfoIcon className="w-5 h-5 text-primary hover:text-primary-600 transition-colors" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-100 text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Discover pickup lines so hot, they&apos;ll beg for more
                  </div>
                </button>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Discover meaningful connections tailored just for you
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col items-center text-gray-600 text-xs">
              <Users className="w-5 h-5 mb-1 text-primary-500" />
              <span>1.2K+ Active</span>
            </div>

            <Button
              variant="outline"
              onClick={onFilterClick}
              className={cn(
                "bg-white hover:bg-primary-50 text-primary-600 hover:text-primary-700 border-primary-200",
                "shadow-sm hover:shadow-md",
                "transition-all duration-200 hover:scale-105",
                "flex items-center gap-2 px-4 py-2 rounded-xl font-medium"
              )}
            >
              <FilterIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Pickup Line Modal */}
      <PickupLineModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MatchHeader;
