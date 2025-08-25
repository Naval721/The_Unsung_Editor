import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Play,
  Award,
  Star,
  Users,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-effects'

const testimonials = [
  {
    id: 1,
    name: "-Aarav Sharma",
    rating: 5,
    content: "The editor did an incredible job transforming raw footage into a cinematic masterpiece! The pacing, transitions, and color grading were flawless. They even added subtle sound effects that elevated the entire video. Super professional and delivered before the deadline. Will definitely work with them again!",

  },
  {
    id: 2,
    name: "-Vikram Joshi",
    rating: 5,
    content: "Great editing work overall—clean cuts, smooth transitions, and perfect synchronization with the music. The only minor suggestion would be to adjust some color tones for consistency, but the final output was still impressive. The editor was very responsive to feedback and made quick revisions. Highly recommend!",

  },
  {
    id: 3,
    name: "-Priya Patel",
    rating: 5,
    content: "We thought we'd seen all the beautiful moments at our wedding... until Unsung Editor showed us what we'd missed! They turned 12 hours of chaotic footage into a 7-minute cinematic love story that had our entire family in tears. The way they highlighted my grandfather's blessing, the playful stolen glances during the pheras, and even the unplanned rain during our exit—pure artistry. We've watched it 47 times and cry every. single. time.",

  }
]

const stats = [
  { number: "500+", label: "Projects Completed", icon: TrendingUp },
  { number: "25+", label: "Industry Awards", icon: Award },
  { number: "98%", label: "Client Satisfaction", icon: Star },
  { number: "10+", label: "Years Experience", icon: Clock }
]

export function AboutSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [titleRef, titleVisible] = useScrollReveal(0.3)
  const [statsRef, statsVisible] = useScrollReveal(0.3)
  const [testimonialsRef, testimonialsVisible] = useScrollReveal(0.3)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-gradient-subtle w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ease-premium ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            About  UNSUNG EDITOR
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Crafting Stories Since <span className="bg-gradient-primary bg-clip-text text-transparent">2015</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From cinematic wedding films to high-impact brand content, we don’t just edit videos we refine vision, emotion, and purpose.
              Let’s make something that moves people.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 transition-all duration-1000 ease-premium delay-200 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="text-center p-6 md:p-8 hover:shadow-elegant transition-all duration-300 magnetic-hover">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Icon className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* About Text */}
          <div className={`space-y-6 transition-all duration-1000 ease-premium delay-300 ${
            titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h3 className="text-2xl md:text-3xl font-bold">Our Mission</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg">
                  Since 2015, I’ve been transforming raw footage into captivating
                  stories—one frame at a time.With a keen eye for detail and a passion for visual storytelling,
                  I specialize in crafting edits that don’t just look polished but feel unforgettable.
              </p>
              <p className="text-base md:text-lg">
                  My approach blends technical precision with creative intuition, ensuring your project isn’t just completed—it’s elevated.
                  Whether it’s a wedding film that brings tears to your eyes, a brand video that boosts engagement, or a passion project that demands perfection,
                  I’m here to make your vision shine.
              </p>
              <p className="text-base md:text-lg">
                  Every story deserves to be told compellingly. Let’s collaborate to make yours stand out.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-primary"
                onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="h-5 w-5 mr-2" />
                View Our Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start a Project
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Team Image Placeholder */}
          <div className={`transition-all duration-1000 ease-premium delay-400 ${
            titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <img src="/public/The unsung editor.jpg" alt="Team" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div
          ref={testimonialsRef}
          className={`transition-all duration-1000 ease-premium delay-500 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">What Our Clients Say</h3>
            <p className="text-muted-foreground">
              Don't just take our word for it - hear from the brands we've helped succeed
            </p>
          </div>

          <Card className="max-w-4xl mx-auto p-6 md:p-8 shadow-elegant">
            <CardContent className="p-0">
              <div className="text-center mb-6">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl italic text-foreground leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
              </div>

              <div className="flex items-center justify-center gap-4">

                <div className="text-left">
                  <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                  <div
                      className="text-sm text-muted-foreground">
                  </div>
                </div>
              </div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-accent w-8' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}