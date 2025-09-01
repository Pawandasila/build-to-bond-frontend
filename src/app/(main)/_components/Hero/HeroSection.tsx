import React from 'react'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'

const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative h-[80vh] overflow-hidden"
      role="banner"
      aria-label="Hero section - Find your soul connection"
    >
      <HeroBackground />
      <HeroContent />
    </section>
  )
}

export default HeroSection
