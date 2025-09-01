import React from "react";
import CTAButtons from "./CTAButtons";
import TrustIndicators from "./TrustIndicators";

const HeroContent: React.FC = () => {
  return (
    <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-4xl mx-auto w-full">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-playfair text-3xl min-[450px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className="block">Find Your</span>
            <span
              className="block text-primary-300 font-homemade-apple text-2xl min-[450px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 sm:mt-2"
              aria-label="Soul Connection - emphasized text"
            >
              Soul Connection
            </span>
          </h1>

          <p
            className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
            role="doc-subtitle"
            aria-describedby="hero-description"
          >
            <span id="hero-description">
              Where souls meet and auras align. Discover meaningful connections
              in a space designed for authentic relationships.
            </span>
          </p>
        </header>

        <CTAButtons />

        <TrustIndicators />
      </div>
    </div>
  );
};

export default HeroContent;
