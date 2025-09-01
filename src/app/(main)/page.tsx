import React from 'react'
import { HeroSection } from './_components/Hero'
import MatchingPreferencesSection from './_components/Matching/MatchingPreferencesSection'

const page = () => {
  return (
    <main className="min-h-screen" role="main">
      <HeroSection />
      <MatchingPreferencesSection />
    </main>
  )
}

export default page
     