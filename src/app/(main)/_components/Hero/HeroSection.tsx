import React from 'react'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'

const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative h-screen sm:h-[90vh] md:h-[85vh] lg:h-[80vh] min-h-[600px] overflow-hidden"
      role="banner"
      aria-label="Hero section - Find your soul connection"
    >
      <HeroBackground />
      <HeroContent />
      
      {/* Floating Decorative Elements - Hidden on mobile for cleaner look */}
      <div 
        className="hidden sm:block absolute top-20 left-10 w-3 h-3 bg-primary-300 rounded-full opacity-60 animate-pulse"
        aria-hidden="true"
      />
      <div 
        className="hidden sm:block absolute top-32 right-16 w-2 h-2 bg-cream rounded-full opacity-80 animate-pulse delay-1000"
        aria-hidden="true"
      />
      <div 
        className="hidden sm:block absolute bottom-32 left-20 w-4 h-4 bg-primary-200 rounded-full opacity-50 animate-pulse delay-500"
        aria-hidden="true"
      />
    </section>
  )
}

export default HeroSection
