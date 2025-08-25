import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Video, 
  Palette, 
  Megaphone, 
  Users, 
  Film, 
  Mic,
  Settings,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const services = [
  {
    icon: Film,
    title: "Wedding Films",
    description: "High-impact commercials that drive brand awareness and conversions through compelling storytelling and stunning visuals.",
    features: ["Concept Development", "Scriptwriting", "Professional Filming", "Post-Production"],
    pricing: "Starting at $25,000"
  },
  {
    icon: Users,
    title: "Couple Stories",
    description: "Professional corporate content that communicates your brand values, culture, and expertise to stakeholders.",
    features: ["Brand Storytelling", "Executive Interviews", "Company Culture", "Training Videos"],
    pricing: "Starting at $15,000"
  },
  {
    icon: Film,
    title: "Documentary Films",
    description: "Compelling documentary narratives that inform, inspire, and create lasting impact on your audience.",
    features: ["Research & Development", "Interview Production", "Archival Integration", "Distribution Strategy"],
    pricing: "Starting at $50,000"
  },
  {
    icon: Megaphone,
    title: "Social Media Content",
    description: "Engaging short-form content optimized for social platforms to maximize reach and engagement.",
    features: ["Platform Optimization", "Vertical Video", "Series Production", "Content Strategy"],
    pricing: "Starting at $5,000"
  },
  {
    icon: Palette,
    title: "Event Highlights",
    description: "Dynamic visual elements that enhance your story through cutting-edge animation and design.",
    features: ["2D/3D Animation", "Visual Effects", "Brand Animation", "Explainer Videos"],
    pricing: "Starting at $10,000"
  },
  {
    icon: Mic,
    title: "Love Story Edits",
    description: "Professional audio services including sound design, music composition, and post-audio mixing.",
    features: ["Sound Design", "Voice-over Recording", "Music Composition", "Audio Mixing"],
    pricing: "Starting at $3,000"
  }
]

const industries = [
  "Weddings & Events",
  "Minimalist & Clean",
  "Social Media Shorts",
  "4K Cinematic Films",
  "Collaborative Edits",
  "Fast-Paced Montages",
  "Experimental/Artistic ",
  "Entertainment & Media"
]

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState(services[0])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById('services')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 bg-background w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-premium ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Settings className="h-4 w-4" />
            Full-Service Production
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            From Concept to <span className="bg-gradient-primary bg-clip-text text-transparent">Completion</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We offer end-to-end video production services, handling every aspect of your project 
            with precision, creativity, and unmatched attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className={`group cursor-pointer transition-all duration-500 ease-premium hover:shadow-elegant hover:scale-105 ${
                  selectedService.title === service.title ? 'ring-2 ring-accent shadow-glow' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onClick={() => setSelectedService(service)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{service.title}</h3>
                      <Badge variant="outline" className="mt-2">{service.pricing}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-6 group-hover:bg-gradient-primary group-hover:text-white transition-all"
                    variant="outline"
                    onClick={() => {
                      // Simulate service details modal
                      alert(`Learning more about: ${service.title}`)
                    }}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Industries Section */}
        <div className={`text-center transition-all duration-1000 ease-premium delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
              Editing Without Limits
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
              From Weddings to Brands & Beyond
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              From heartfelt weddings to high-impact brand campaigns,
              we adapt our editing style to match your unique story—because
              great storytelling transcends categories.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <div
                key={industry}
                className={`p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-card transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${800 + index * 50}ms` }}
              >
                <span className="font-medium text-sm">{industry}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary shadow-glow"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}