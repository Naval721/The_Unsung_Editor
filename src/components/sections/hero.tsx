import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, ArrowDown, MousePointer } from 'lucide-react'
import { useParallax, useMagnetic } from '@/hooks/use-scroll-effects'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const parallaxRef = useParallax(0.3)
  const magneticRef = useMagnetic(0.1)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-dark px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
      {/* Background Effects with Parallax */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent dark:from-accent/10"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div 
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"
        style={{ transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.12}px)` }}
      />

      {/* Enhanced Background for Light Theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/40 dark:from-transparent dark:via-transparent dark:to-transparent" />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        <div className={`transition-all duration-1000 ease-premium ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Main Heading */}
          <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 px-2">
            <span className="bg-gradient-primary bg-clip-text text-transparent drop-shadow-sm">
              Framing Feelings
            </span>
            <span className="inline xs:hidden"> </span>
            <br className="hidden xs:inline" />
            <span className="text-foreground drop-shadow-sm">
             That Dance in Slow Motion
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-12 drop-shadow-sm px-2 sm:px-4">
              From wedding films to brand campaigns
            <span className="text-accent font-semibold drop-shadow-sm"> we craft edits that don't just look good</span> they spark emotions and achieve your goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4 w-full max-w-xl mx-auto">
            <Button 
              ref={magneticRef}
              size="lg" 
              className="w-full xs:flex-1 bg-gradient-primary hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 text-sm xs:text-base sm:text-lg px-4 xs:px-6 sm:px-8 py-3 xs:py-4 sm:py-5 shadow-glow magnetic-hover drop-shadow-lg touch-manipulation"
              onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                 Wedding stories
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full xs:flex-1 border-border/50 hover:bg-card/50 backdrop-blur-sm text-sm xs:text-base sm:text-lg px-4 xs:px-6 sm:px-8 py-3 xs:py-4 sm:py-5 glass-effect magnetic-hover drop-shadow-sm bg-background/80 dark:bg-background/20 active:scale-95 touch-manipulation"
              onClick={() => document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MousePointer className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Watch Our Reels
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto px-2 sm:px-4">
            <div className="text-center p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-background/60 dark:bg-background/20 backdrop-blur-sm border border-border/20">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-accent mb-0.5 xs:mb-1 drop-shadow-sm">300</div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Projects Completed</div>
            </div>
            <div className="text-center p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-background/60 dark:bg-background/20 backdrop-blur-sm border border-border/20">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-accent mb-0.5 xs:mb-1 drop-shadow-sm">150</div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Clients</div>
            </div>
            <div className="text-center p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-background/60 dark:bg-background/20 backdrop-blur-sm border border-border/20 col-span-2 xs:col-span-1">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-accent mb-0.5 xs:mb-1 drop-shadow-sm">99%</div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Right Side */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-10 animate-enhanced-bounce">
        <button 
          onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-background/80 dark:bg-background/40 backdrop-blur-md shadow-md border border-border/30 hover:scale-105 active:scale-95 touch-manipulation"
          aria-label="Scroll to showcase section"
        >
          <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
          <ArrowDown className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
    </section>
  )
}