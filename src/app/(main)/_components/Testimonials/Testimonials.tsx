import React from 'react'
import Image from 'next/image'

interface TestimonialProps {
  quote: string
  name: string
  age: number
  location: string
  avatar: string
  relationshipLength: string
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  name, 
  age, 
  location, 
  avatar, 
  relationshipLength 
}) => {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Quote */}
      <div className="mb-6">
        <svg className="w-8 h-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
        <p className="font-sans text-lg text-foreground leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary-100">
          <Image
            src={avatar}
            alt={`${name} profile picture`}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-lg">{name}, {age}</h4>
          <p className="text-muted-foreground text-sm">{location}</p>
          <p className="text-primary text-sm font-medium">{relationshipLength}</p>
        </div>
      </div>
    </div>
  )
}

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "I never believed in soulmates until I met Emma on Soulara. The spiritual compatibility matching is incredible - we connected on such a deep level from day one. We&apos;re now planning our wedding!",
      name: "Marcus",
      age: 29,
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      relationshipLength: "Together 2 years"
    },
    {
      quote: "After years of meaningless dating apps, Soulara was a breath of fresh air. The verified profiles and focus on authentic connections helped me find someone who truly understands my values and dreams.",
      name: "Priya",
      age: 27,
      location: "Toronto, Canada",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      relationshipLength: "Together 1.5 years"
    },
    {
      quote: "The aura matching feature sounds mystical, but it really works! Sarah and I have this amazing energy together. Soulara helped us find something special that goes beyond physical attraction.",
      name: "David",
      age: 34,
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      relationshipLength: "Together 3 years"
    },
    {
      quote: "I was skeptical about online dating, but Soulara&apos;s focus on spiritual connection and meaningful relationships changed everything. Met my life partner here and couldn&apos;t be happier!",
      name: "Sofia",
      age: 31,
      location: "Barcelona, Spain",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      relationshipLength: "Together 1 year"
    },
    {
      quote: "The relationship coaching and guidance really helped me understand what I was looking for. Found someone who shares my spiritual journey and we support each other&apos;s growth every day.",
      name: "Alex",
      age: 26,
      location: "Melbourne, Australia",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      relationshipLength: "Together 2.5 years"
    },
    {
      quote: "Soulara isn&apos;t just another dating app - it&apos;s a platform for finding your person. The quality of connections here is unmatched. So grateful for this beautiful love story!",
      name: "Isabella",
      age: 28,
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      relationshipLength: "Together 1.8 years"
    }
  ]

  return (
    <section 
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-16 lg:mb-20">
          <h2 
            id="testimonials-heading"
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Love Stories That Inspire
          </h2>
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real couples who found their soulmates through Soulara share their journey to authentic love and meaningful connections.
          </p>
        </header>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              age={testimonial.age}
              location={testimonial.location}
              avatar={testimonial.avatar}
              relationshipLength={testimonial.relationshipLength}
            />
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground font-medium">Success Stories</div>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground font-medium">Satisfaction Rate</div>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2.3 years</div>
            <div className="text-muted-foreground font-medium">Avg Relationship</div>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground font-medium">Marriages</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
