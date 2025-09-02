import React from "react";
import HeroContent from "./HeroContent";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-primary-50 min-h-[80vh] flex items-center"
      role="banner"
      aria-label="Hero section - Find your soul connection"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <HeroContent />
          </div>

          <div className="flex-1 max-w-md lg:max-w-xl">
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image
                src="/assets/hero/hero-01.png"
                alt="Couple finding their soul connection"
                fill
                className="object-contain transition-transform duration-500"
                priority
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
