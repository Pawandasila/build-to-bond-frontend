import React from "react";
import CTAButtons from "./CTAButtons";
import TrustIndicators from "./TrustIndicators";



const HeroContent: React.FC = () => {
  return (
    <div className="w-full">
      <header className="mb-8 lg:mb-10">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">
          <span className="block">Find Your</span>
          <span
            className="block text-primary font-homemade-apple text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2"
            aria-label="Soul Connection - emphasized text"
          >
            Soul Connection
          </span>
        </h1>
        
        <p
          className="font-sans text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 lg:mb-10 max-w-2xl leading-relaxed"
          role="doc-subtitle"
          aria-describedby="hero-description"
        >
          <span id="hero-description">
            Where souls meet and auras align. Discover meaningful connections
            in a space designed for authentic relationships.
          </span>
        </p>
      </header>

      <div className="mb-8 lg:mb-10">
        <CTAButtons />
      </div>

      <TrustIndicators />
    </div>
  );
};

export default HeroContent;