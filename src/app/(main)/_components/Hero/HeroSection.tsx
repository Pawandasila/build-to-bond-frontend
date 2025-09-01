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
      
    </section>
  )
}

export default HeroSection
