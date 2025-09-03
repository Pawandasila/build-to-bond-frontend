"use client";

import React from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchFallbackProps {
  onRefresh?: () => void;
  loading?: boolean;
}

const MatchFallback: React.FC<MatchFallbackProps> = ({ onRefresh, loading = false }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between min-h-64 gap-8">
        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <Image 
              src="/assets/hero/match.png" 
              alt="Find your match illustration" 
              width={500}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        
        <div className="flex-1 max-w-md">
          {loading ? (
            <>
              <div className="w-16 h-16 mb-6 relative">
                <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Finding Your Perfect Matches...
              </h3>
              <p className="text-gray-600 mb-6">
                Our AI is analyzing compatibility based on your preferences and personality
              </p>
            </>
          ) : (
            <>              
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Ready to Find Your Match?
              </h3>
              <p className="text-gray-600 mb-6">
                Your potential matches will appear here. Start exploring meaningful connections tailored just for you!
              </p>
              
              {onRefresh && (
                <Button
                  onClick={onRefresh}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Find Matches
                </Button>
              )}
            </>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">1000+</div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-xs text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchFallback;
