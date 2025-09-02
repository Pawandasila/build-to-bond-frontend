import Image from 'next/image'
import React from 'react'

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0" role="img" aria-label="Background image of a loving couple">
      {/* <Image 
        src="/assets/hero/couple.jpg" 
        alt="Couple in love representing meaningful connections on Soulara dating platform"
        fill
        className="object-cover object-[center_20%]"
        priority
        sizes="100vw"
      /> */}
      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/90"
        aria-hidden="true"
      />
    </div>
  )
}

export default HeroBackground
