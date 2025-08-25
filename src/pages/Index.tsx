import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/sections/hero'
import { ShowcaseSection } from '@/components/sections/showcase'
import { ReelsSection } from '@/components/sections/reels'
import { ServicesSection } from '@/components/sections/services'
import { AboutSection } from '@/components/sections/about'
import { ContactSection } from '@/components/sections/contact'

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-background text-foreground">
        <Header />
        <main className="flex flex-col w-full">
          <HeroSection />
          <ShowcaseSection />
          <ReelsSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
