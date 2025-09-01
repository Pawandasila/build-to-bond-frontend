import React from 'react'
import { HeroSection } from './_components/Hero'
import MatchingPreferencesSection from './_components/Matching/MatchingPreferencesSection'
import HowItWorks from './_components/HowItWorks/HowItWorks'

const page = () => {
  return (
    <main className="min-h-screen" role="main">
      <HeroSection />
      <MatchingPreferencesSection />
      <HowItWorks />
    </main>
  )
}

export default page
     