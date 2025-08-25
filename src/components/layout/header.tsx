import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium w-full",
      isScrolled 
        ? "bg-background/90 dark:bg-background/80 backdrop-blur-xl border-b border-border shadow-card" 
        : "bg-background/60 dark:bg-transparent backdrop-blur-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full">
          {/* Logo */}
          <div className="flex flex-col justify-center">
            <div className="flex items-end space-x-1 xs:space-x-2">
              <span className="text-sm xs:text-lg sm:text-2xl font-bold tracking-widest uppercase text-[#FF7300] dark:text-[#FF7300]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>
                THE
              </span>
              <span className="text-base xs:text-2xl sm:text-3xl font-bold tracking-widest uppercase text-[#22223B] dark:text-white" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.12em' }}>
                UNSUNG
              </span>
              <span className="text-sm xs:text-lg sm:text-2xl font-bold tracking-widest uppercase text-[#FF7300] dark:text-[#FF7300]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>
                EDITOR
              </span>
            </div>
            <div className="w-12 xs:w-16 h-0.5 bg-white/30 mx-auto mt-1 rounded-full opacity-80" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-foreground/90 dark:text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full drop-shadow-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hidden md:flex hover:bg-accent/10 dark:hover:bg-accent/20"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            
            <Button 
              className="hidden md:flex bg-gradient-primary hover:opacity-90 transition-opacity drop-shadow-lg"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Project
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-accent/10 dark:hover:bg-accent/20 active:scale-95 touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 w-full bg-background/95 dark:bg-background/95 backdrop-blur-xl border-b border-border shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'}`}>
          <nav className="flex flex-col px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground/90 dark:text-foreground/80 hover:text-foreground transition-colors text-left py-3 px-4 rounded-lg hover:bg-accent/10 dark:hover:bg-accent/20 active:scale-95 touch-manipulation text-base font-medium"
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="hover:bg-accent/10 dark:hover:bg-accent/20 active:scale-95 touch-manipulation"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
                Theme
              </Button>
              <Button 
                className="bg-gradient-primary drop-shadow-lg active:scale-95 touch-manipulation px-4 py-2 text-sm font-medium"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Start Project
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}