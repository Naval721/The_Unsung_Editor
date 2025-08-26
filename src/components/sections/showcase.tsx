import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Play, ExternalLink, Award, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    id: 1,
    title: "Eternal Blossoms",
    category: "WEDDING",
    client: "",
    description: "An enchanting garden wedding film capturing intimate moments amidst blooming flowers",
    tags: ["Wedding", "Garden", "Romance"],
    views: "2.1M",
    videoUrl: "https://res.cloudinary.com/dteo3samn/video/upload/v1753774548/vid6_jfq0zs.mp4"
  },
  {
    id: 2,
    title: "Waves of Forever",
    category: "WEDDING",
    client: "",
    description: "A breathtaking seaside ceremony with golden hour vows and ocean waves",
    tags: ["Wedding", "Beach", "Destination"],
    views: "850K",
    videoUrl: "https://res.cloudinary.com/dteo3samn/video/upload/v1756128549/teaser_1_1_ctkk1m.mp4"
  },
  {
    id: 3,
    title: "Rustic Hearts Unite",
    category: "WEDDING",
    client: "",
    description: "Rustic elegance meets timeless love in this charming countryside celebration",
    tags: ["Wedding", "Rustic", "Vintage"],
    views: "1.8M",
    videoUrl: "https://res.cloudinary.com/dteo3samn/video/upload/v1756140969/Keral_Teaser_QT_1_ek953d.mp4"
  },
  {
    id: 4,
    title: "Crown of Love",
    category: "WEDDING",
    client: "",
    description: "A majestic fairytale wedding with grand architecture and opulent details",
    tags: ["Wedding", "Luxury", "Palace"],
    views: "4.2M",
    videoUrl: "https://res.cloudinary.com/dteo3samn/video/upload/v1753774525/vid2_aesdnf.mp4"
  },
  {
    id: 5,
    title: "Summit of Souls",
    category: "WEDDING",
    client: "",
    description: "An adventurous intimate ceremony surrounded by stunning mountain vistas",
    tags: ["Wedding", "Elopement", "Mountain"],
    views: "1.2M",
    videoUrl: "https://res.cloudinary.com/dteo3samn/video/upload/v1753774508/vid7_dsecvm.mp4"
  },
  {
    id: 6,
    title: "Skyline Promises",
    category: "WEDDING",
    client: "",
    description: "Modern city celebration with skyline views and contemporary elegance",
    tags: ["Wedding", "Urban", "Modern"],
    views: "2.8M",
    videoUrl: "https://res.cloudinary.com/dteo3samn/video/upload/v1753774524/vid4_tvz2e5.mp4"
  },
]

export function ShowcaseSection() {
  // Improved responsive design for all screen sizes
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [videoMuted, setVideoMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [showAutoPlayNotification, setShowAutoPlayNotification] = useState(false)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const mainVideoRef = useRef<HTMLDivElement>(null)

  const currentProject = projects[currentProjectIndex]

  // Enhanced card selection with smooth scroll to main video
  const handleCardSelect = (project: typeof projects[0], index: number) => {
    // Don't do anything if same project is selected
    if (index === currentProjectIndex) return
    
    // Set loading state
    setIsLoading(true)
    
    // Update both states to keep mobile and desktop in sync
    setSelectedProject(project)
    setCurrentProjectIndex(index)
    
    // Pause any currently playing video
    setIsPlaying(false)
    
    // Smooth scroll to main video player
    if (mainVideoRef.current) {
      mainVideoRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      })
    }
    
    // Add a subtle scale animation to the main video container
    if (mainVideoRef.current) {
      mainVideoRef.current.style.transform = 'scale(0.98)'
      setTimeout(() => {
        if (mainVideoRef.current) {
          mainVideoRef.current.style.transform = 'scale(1)'
        }
        // Remove loading state after animation
        setTimeout(() => {
          setIsLoading(false)
        }, 200)
      }, 150)
    }

    // Attempt to auto-play the main video after selection
    const tryPlay = () => {
      const mobileVideo = mobileVideoRef.current
      const desktopVideo = desktopVideoRef.current
      const activeVideo = window.innerWidth < 640 ? mobileVideo : desktopVideo
      if (activeVideo) {
        const playPromise = activeVideo.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false)) // autoplay may be blocked
        } else {
          setIsPlaying(true)
        }
      }
    }

    // Try immediately in the same gesture, then retry shortly after render
    tryPlay()
    setTimeout(tryPlay, 100)
  }

  // Sync selectedProject with currentProjectIndex for desktop
  useEffect(() => {
    setSelectedProject(projects[currentProjectIndex])
  }, [currentProjectIndex])

  // Simple audio toggle function
  const toggleVideoAudio = () => {
    const mobileVideo = mobileVideoRef.current
    const desktopVideo = desktopVideoRef.current
    
    if (mobileVideo) {
      mobileVideo.muted = !videoMuted
    }
    if (desktopVideo) {
      desktopVideo.muted = !videoMuted
    }
    setVideoMuted(!videoMuted)
  }

  // Enhanced parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle keyboard events when the showcase section is visible
      if (!isVisible) return
      
      switch (e.key) {
        case 'ArrowLeft': {
          e.preventDefault()
          const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length
          handleCardSelect(projects[prevIndex], prevIndex)
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          const nextIndex = (currentProjectIndex + 1) % projects.length
          handleCardSelect(projects[nextIndex], nextIndex)
          break
        }
        case ' ':
        case 'Enter': {
          e.preventDefault()
          // Handle play/pause directly here to avoid dependency issues
          const mobileVideo = mobileVideoRef.current
          const desktopVideo = desktopVideoRef.current
          const activeVideo = window.innerWidth < 640 ? mobileVideo : desktopVideo
          
          if (activeVideo) {
            if (isPlaying) {
              activeVideo.pause()
            } else {
              const playPromise = activeVideo.play()
              if (playPromise !== undefined) {
                playPromise.catch(error => {
                  console.log("Auto-play was prevented:", error)
                  return
                })
              }
            }
            setIsPlaying(!isPlaying)
          }
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isVisible, currentProjectIndex, isPlaying])

  // Handle project change - pause video and reset
  useEffect(() => {
    const mobileVideo = mobileVideoRef.current
    const desktopVideo = desktopVideoRef.current
    
    if (mobileVideo) {
      mobileVideo.pause()
      mobileVideo.currentTime = 0
    }
    if (desktopVideo) {
      desktopVideo.pause()
      desktopVideo.currentTime = 0
    }
    setIsPlaying(false)
  }, [selectedProject, currentProjectIndex])

  const handlePlayPause = () => {
    const mobileVideo = mobileVideoRef.current
    const desktopVideo = desktopVideoRef.current
    const activeVideo = window.innerWidth < 640 ? mobileVideo : desktopVideo
    
    if (activeVideo) {
      if (isPlaying) {
        activeVideo.pause()
      } else {
        // For mobile, ensure we can play
        const playPromise = activeVideo.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Auto-play was prevented:", error)
            // Reset the play state if autoplay fails
            setIsPlaying(false)
          })
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoEnded = () => {
    if (autoPlay) {
      // Show autoplay notification
      setShowAutoPlayNotification(true)
      setTimeout(() => {
        setShowAutoPlayNotification(false)
      }, 2000)
      
      // Auto-play next video
      const nextIndex = (currentProjectIndex + 1) % projects.length
      
      // Move to next project
      handleCardSelect(projects[nextIndex], nextIndex)
      
      // Auto-play the next video after a short delay to allow loading
      setTimeout(() => {
        const mobileVideo = mobileVideoRef.current
        const desktopVideo = desktopVideoRef.current
        const activeVideo = window.innerWidth < 640 ? mobileVideo : desktopVideo
        
        if (activeVideo) {
          const playPromise = activeVideo.play()
          if (playPromise !== undefined) {
            playPromise.then(() => {
              setIsPlaying(true)
            }).catch(error => {
              console.log("Auto-play was prevented:", error)
              setIsPlaying(false)
            })
          }
        }
      }, 500) // Small delay to ensure video has loaded
    } else {
      // Just stop playing if autoplay is disabled
      setIsPlaying(false)
    }
  }

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Enhanced parallax transform calculations
  const getParallaxTransform = (speed: number = 0.5, offset: number = 0) => {
    if (!sectionRef.current) return 0
    const rect = sectionRef.current.getBoundingClientRect()
    const scrolled = window.pageYOffset
    const rate = (scrolled + offset) * speed
    return rate
  }

  // VideoHut-style smooth easing
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2

  return (
    <section 
      ref={sectionRef}
      id="showcase" 
      className="relative py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-subtle px-4 sm:px-6 overflow-hidden w-full"
    >
      {/* Enhanced Parallax Background Elements - VideoHut Style */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${getParallaxTransform(0.2)}px)`,
        }}
      >
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-lg blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Secondary parallax layer */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${getParallaxTransform(0.4, 200)}px)`,
        }}
      >
        <div className="absolute top-1/4 right-1/3 w-28 h-28 bg-accent/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-primary/30 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with VideoHut-Style Staggered Animation */}
        <div className={`text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            className={`inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-medium mb-3 xs:mb-4 sm:mb-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Award className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Featured Projects</span>
            <span className="xs:hidden">Projects</span>
          </div>
          <h2 
            className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 xs:mb-4 sm:mb-6 px-2 xs:px-4 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Stories That <span className="bg-gradient-primary bg-clip-text text-transparent">Define Excellence</span>
          </h2>
          <p 
            className={`text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 xs:px-4 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Each project represents our commitment to pushing creative boundaries and delivering 
            measurable results for our clients across diverse industries.
          </p>
        </div>

        {/* Mobile Layout - Main Video with Thumbnail Grid */}
        <div className="block sm:hidden w-full">
          <div className="max-w-4xl mx-auto w-full">
            {/* Main Project Title */}
            <div className={`text-center mb-4 xs:mb-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '800ms' }}>
              <h3 className="text-lg xs:text-xl font-bold mb-1.5 xs:mb-2">
                {currentProject.title}
              </h3>
              <p className="text-xs xs:text-sm text-accent font-medium">
                {currentProject.client}
              </p>
            </div>

            {/* Video Card - Mobile */}
            <div 
              ref={mainVideoRef}
              className={`relative transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: '1000ms',
                transition: 'all 0.3s ease-out'
              }}
            >
              <Card className="overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                <div className="relative aspect-video">
                  {/* Video Element */}
                  <video
                    ref={mobileVideoRef}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={currentProject.videoUrl}
                    onEnded={handleVideoEnded}
                    muted={videoMuted}
                    controls={false}
                    playsInline
                    preload="metadata"
                    webkit-playsinline="true"
                  />
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/30 transition-all duration-300 group-hover:bg-black/10" />
                  
                  {/* Controls - Top Right */}
                  <div className="absolute top-4 right-4 z-10 flex gap-3 sm:gap-2">
                    {/* AutoPlay Control */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setAutoPlay(!autoPlay)
                      }}
                      className={`backdrop-blur-sm text-white p-2 h-10 w-10 sm:h-8 sm:w-8 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation ${
                        autoPlay 
                          ? 'bg-accent/60 hover:bg-accent/80' 
                          : 'bg-black/40 hover:bg-black/60'
                      }`}
                      title={autoPlay ? 'Auto-play enabled' : 'Auto-play disabled'}
                    >
                      <RotateCcw className="h-4 w-4 sm:h-3 sm:w-3" />
                    </Button>
                    
                    {/* Audio Control */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        toggleVideoAudio()
                      }}
                      className="bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2 h-10 w-10 sm:h-8 sm:w-8 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
                      title={videoMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {videoMuted ? <VolumeX className="h-4 w-4 sm:h-3 sm:w-3" /> : <Volume2 className="h-4 w-4 sm:h-3 sm:w-3" />}
                    </Button>
                  </div>

                  {/* Play/Pause Overlay */}
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/20 cursor-pointer touch-manipulation"
                      onClick={handlePlayPause}
                    >
                      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-5 sm:p-4 shadow-lg transition-all duration-300 group-hover:scale-110 active:scale-95 group-hover:bg-white/30">
                        <Play className="h-10 w-10 sm:h-8 sm:w-8 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Clean overlay when playing - clickable to pause */}
                  {isPlaying && (
                    <div 
                      className="absolute inset-0 cursor-pointer"
                      onClick={handlePlayPause}
                    />
                  )}

                  {/* Loading Overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white text-sm font-medium">Switching Project...</p>
                      </div>
                    </div>
                  )}

                  {/* AutoPlay Notification */}
                  {showAutoPlayNotification && (
                    <div className="absolute top-4 left-4 z-30 animate-in fade-in slide-in-from-left-2 duration-500">
                      <div className="bg-accent/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
                        <RotateCcw className="h-3 w-3" />
                        <span className="text-xs font-medium">Auto-playing next video...</span>
                      </div>
                    </div>
                  )}


                </div>

                {/* Card Content */}
                <CardContent className="p-5 sm:p-4 bg-card">
                  <div className="space-y-4 sm:space-y-3">
                    <p className="text-accent font-semibold text-sm">
                      {currentProject.client}
                    </p>
                    <h3 className="text-xl sm:text-lg font-bold text-foreground">
                      {currentProject.title}
                    </h3>

                    <div className="flex flex-col gap-3">
                      <Button 
                        className="bg-gradient-primary text-base sm:text-sm py-6 sm:py-4 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
                        ) : (
                          <Play className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
                        )}
                        {isPlaying ? 'Pause Video' : 'Play Video'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Instructions */}
              <div className="text-center mt-6 sm:mt-4 space-y-2 sm:space-y-1 px-4 sm:px-0">
                <div className="text-base sm:text-sm text-muted-foreground">
                  Tap to {isPlaying ? 'pause' : 'play'}
                </div>
                <div className="hidden sm:flex text-xs text-muted-foreground/60 items-center justify-center gap-2">
                  <span>Use ← → arrows to navigate</span>
                  <span>•</span>
                  <span>Space to play/pause</span>
                </div>
                <div className="text-sm sm:text-xs flex items-center justify-center gap-2 mt-3 sm:mt-2">
                  <div className={`flex items-center gap-1 px-3 py-2 sm:px-2 sm:py-1 rounded-full ${
                    autoPlay ? 'bg-accent/10 text-accent' : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground'
                  }`}>
                    <RotateCcw className="h-4 w-4 sm:h-3 sm:w-3" />
                    <span>{autoPlay ? 'Auto-play ON' : 'Auto-play OFF'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Grid Navigation */}
            <div className={`mt-8 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1200ms' }}>
              <div className="text-center mb-6 sm:mb-4 space-y-2 sm:space-y-1">
                <h4 className="text-base sm:text-sm font-medium text-muted-foreground">
                  Browse Projects
                </h4>
                <p className="text-sm sm:text-xs text-accent font-medium">
                  {currentProjectIndex + 1} of {projects.length}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto px-2">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => handleCardSelect(project, index)}
                    className={`group relative aspect-video rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation ${
                      index === currentProjectIndex 
                        ? 'ring-2 ring-accent shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    {/* Thumbnail Video */}
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={project.videoUrl}
                      muted
                      preload="metadata"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      index === currentProjectIndex 
                        ? 'bg-accent/20' 
                        : 'bg-black/40 group-hover:bg-black/20'
                    }`} />
                    
                    {/* Project Info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <h5 className="text-white text-sm sm:text-xs font-medium leading-tight mb-1 drop-shadow-sm">
                        {project.title}
                      </h5>
                      <p className="text-white/80 text-xs drop-shadow-sm">
                        {project.client}
                      </p>
                    </div>
                    
                    {/* Active Indicator */}
                    {index === currentProjectIndex && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - VideoHut-Style Card Design */}
        <div className="hidden sm:block">
          {/* Main Featured Video */}
          <div 
            ref={mainVideoRef}
            className={`mb-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '800ms',
              transition: 'all 0.3s ease-out'
            }}
          >
            <Card className="overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group max-w-4xl mx-auto">
              <div className="relative aspect-video">
                {/* Navigation Arrows */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length
                      handleCardSelect(projects[prevIndex], prevIndex)
                    }}
                    className="bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2 h-10 w-10 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      const nextIndex = (currentProjectIndex + 1) % projects.length
                      handleCardSelect(projects[nextIndex], nextIndex)
                    }}
                    className="bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2 h-10 w-10 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                {/* Video Element */}
                <video
                  ref={desktopVideoRef}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={selectedProject.videoUrl}
                  onEnded={handleVideoEnded}
                  muted={videoMuted}
                  controls={false}
                  playsInline
                  preload="metadata"
                />
                
                {/* Video Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/30 transition-all duration-300 group-hover:bg-black/10" />
                )}

                {/* Controls - Desktop Top Right */}
                <div className="absolute top-6 right-6 z-10 flex gap-3">
                  {/* AutoPlay Control - Desktop */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      setAutoPlay(!autoPlay)
                    }}
                    className={`backdrop-blur-sm text-white p-3 h-10 w-10 transition-all duration-300 hover:scale-110 ${
                      autoPlay 
                        ? 'bg-accent/60 hover:bg-accent/80' 
                        : 'bg-black/40 hover:bg-black/60'
                    }`}
                    title={autoPlay ? 'Auto-play enabled' : 'Auto-play disabled'}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  
                  {/* Audio Control - Desktop */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      toggleVideoAudio()
                    }}
                    className="bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-3 h-10 w-10 transition-all duration-300 hover:scale-110"
                    title={videoMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {videoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                {/* Video Controls */}
                {!isPlaying && !isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      onClick={handlePlayPause}
                      className="bg-white/20 dark:bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 h-16 w-16 rounded-full p-0 shadow-lg group-hover:scale-110"
                    >
                      <Play className="h-8 w-8 text-white ml-1" />
                    </Button>
                  </div>
                )}

                {/* Loading Overlay - Desktop */}
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-white text-base font-medium">Switching Project...</p>
                    </div>
                  </div>
                )}

                {/* AutoPlay Notification - Desktop */}
                {showAutoPlayNotification && (
                  <div className="absolute top-6 left-6 z-30 animate-in fade-in slide-in-from-left-2 duration-500">
                    <div className="bg-accent/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
                      <RotateCcw className="h-4 w-4" />
                      <span className="text-sm font-medium">Auto-playing next video...</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Card Content */}
              <CardContent className="p-6 bg-card">
                <div className="space-y-4">
                  <p className="text-accent font-semibold text-base">
                    {selectedProject.client}
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedProject.title}
                  </h3>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="bg-gradient-primary transition-all duration-300 hover:scale-105"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 mr-2" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      {isPlaying ? 'Pause Video' : 'Watch Video'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Indicator */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-sm text-muted-foreground">Project</span>
              <span className="text-sm font-semibold text-accent">
                {currentProjectIndex + 1} of {projects.length}
              </span>
            </div>
            <div className="max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-gradient-primary h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentProjectIndex + 1) / projects.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Project Grid - VideoHut-Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={project.id}
                className={`cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:scale-105 group relative ${
                  selectedProject.id === project.id ? 'ring-2 ring-accent shadow-glow' : 'hover:shadow-xl'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ 
                  transitionDelay: `${1200 + index * 150}ms`,
                  transform: `translateY(${isVisible ? 0 : 20}px)`
                }}
                onClick={() => handleCardSelect(project, index)}
              >
                <div className="relative aspect-video overflow-hidden">
                  {/* Thumbnail Video */}
                  <video
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={project.videoUrl}
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/20" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-black/60 backdrop-blur-sm text-white border-0 text-xs font-medium">
                      {project.category}
                    </Badge>
                  </div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  

                  
                  {/* Selected State Indicator */}
                  {selectedProject.id === project.id && (
                    <div className="absolute top-3 right-3">
                      <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4 bg-card">
                  <p className="text-accent font-semibold text-sm mb-2">
                    {project.client}
                  </p>
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}