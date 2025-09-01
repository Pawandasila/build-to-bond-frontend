import React from 'react'
import { HeroSection } from './_components/Hero'
import MatchingPreferencesSection from './_components/Matching/MatchingPreferencesSection'
import HowItWorks from './_components/HowItWorks/HowItWorks'
import Features from './_components/Features'
import Testimonials from './_components/Testimonials'
import Pricing from './_components/Pricing'
import FAQ from './_components/FAQ'

const page = () => {
  return (
    <main className="min-h-screen" role="main">
      <HeroSection />
      <MatchingPreferencesSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
    </main>
  )
}

export default page