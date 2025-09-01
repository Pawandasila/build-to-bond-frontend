"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Heart, Sparkles } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-primary-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Section */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              <Image
                src="/assets/not-found.jpg"
                alt="Lost in space - astronaut and rocket illustration"
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
              
              {/* Floating elements for extra magic */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full opacity-70 animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-primary-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-4 -left-6 w-10 h-10 bg-primary-200 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              {/* Error Code with sparkle effect */}
              <div className="relative inline-block">
                <h1 className="font-playfair text-8xl md:text-9xl lg:text-[10rem] font-bold text-primary leading-none">
                  404
                </h1>
                <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-primary-400 animate-pulse" />
                <Sparkles className="absolute -bottom-2 -left-4 w-6 h-6 text-primary-300 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              {/* Main heading */}
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Oops! Lost in Space
              </h2>
              
              {/* Subheading with soul theme */}
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Your soulmate page has drifted into the cosmos
              </p>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed">
                Don&apos;t worry, even astronauts get lost sometimes! Let&apos;s guide you back to finding meaningful connections on your journey to love.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/">
                <Button className="bg-primary hover:bg-primary-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Return Home
                </Button>
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="bg-background border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>

            {/* Fun message */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-foreground">Cosmic Love Tip</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Just like finding your soulmate, sometimes the best discoveries happen when you&apos;re exploring new paths. Keep searching! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section with navigation suggestions */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/" className="group bg-card hover:bg-primary-50 rounded-xl p-6 border border-border hover:border-primary-200 transition-all duration-300">
            <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary rounded-full flex items-center justify-center mb-4 mx-auto transition-colors">
              <Home className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Home</h3>
            <p className="text-muted-foreground text-sm">Start your soulmate journey</p>
          </Link>
          
          <Link href="/signup" className="group bg-card hover:bg-primary-50 rounded-xl p-6 border border-border hover:border-primary-200 transition-all duration-300">
            <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary rounded-full flex items-center justify-center mb-4 mx-auto transition-colors">
              <Heart className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Join Soulara</h3>
            <p className="text-muted-foreground text-sm">Create your cosmic profile</p>
          </Link>
          
          <Link href="/login" className="group bg-card hover:bg-primary-50 rounded-xl p-6 border border-border hover:border-primary-200 transition-all duration-300">
            <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary rounded-full flex items-center justify-center mb-4 mx-auto transition-colors">
              <Sparkles className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Sign In</h3>
            <p className="text-muted-foreground text-sm">Continue your cosmic journey</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound