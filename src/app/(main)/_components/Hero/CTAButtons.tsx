import React from 'react'
import { Button } from '@/components/ui/button'

const CTAButtons: React.FC = () => {
  return (
    <nav 
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
      role="navigation"
      aria-label="Primary call-to-action buttons"
    >
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary-600 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Start your journey to find meaningful connections"
        type="button"
      >
        Start Your Journey
      </Button>
      <Button 
        variant="outline" 
        size="lg"
        className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300"
        aria-label="Learn more about Soulara dating platform"
        type="button"
      >
        Learn More
      </Button>
    </nav>
  )
}

export default CTAButtons
