import React from 'react'

interface TrustIndicatorProps {
  icon: React.ReactNode
  text: string
  iconColor: string
  ariaLabel: string
}

const TrustIndicator: React.FC<TrustIndicatorProps> = ({ icon, text, iconColor, ariaLabel }) => (
  <div className="flex items-center gap-2 min-w-0 flex-shrink-0" role="listitem">
    <span className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} flex-shrink-0`} aria-label={ariaLabel}>
      {icon}
    </span>
    <span className="font-medium text-sm sm:text-base whitespace-nowrap">{text}</span>
  </div>
)

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      text: "100% Verified Profiles",
      iconColor: "text-green-400",
      ariaLabel: "Checkmark icon indicating verified profiles"
    },
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      ),
      text: "Private & Secure",
      iconColor: "text-blue-400",
      ariaLabel: "Lock icon indicating privacy and security"
    },
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      text: "Meaningful Connections",
      iconColor: "text-pink-400",
      ariaLabel: "Heart icon representing meaningful connections"
    }
  ]

  return (
    <aside 
      className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start justify-start gap-4 sm:gap-6 text-white/80 px-2 sm:px-0"
      aria-label="Trust indicators and platform benefits"
    >
      <ul className="flex flex-col min-[450px]:flex-row sm:flex-row items-start justify-start gap-4 sm:gap-6 text-center min-[450px]:text-left" role="list">
        {indicators.map((indicator, index) => (
          <TrustIndicator
            key={index}
            icon={indicator.icon}
            text={indicator.text}
            iconColor={indicator.iconColor}
            ariaLabel={indicator.ariaLabel}
          />
        ))}
      </ul>
    </aside>
  )
}

export default TrustIndicators
