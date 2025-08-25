import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Play, Pause, Volume2, VolumeX, ArrowRight } from 'lucide-react'

const reels = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: 4,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
]

export function ReelsSection() {
  const [selectedReel, setSelectedReel] = useState(reels[0])
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [mainVideoRef, setMainVideoRef] = useState<HTMLVideoElement | null>(null)
  const [smallVideoRefs, setSmallVideoRefs] = useState<(HTMLVideoElement | null)[]>([])
  const [playingSmallVideo, setPlayingSmallVideo] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById('reels')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handlePlayPause = () => {
    if (mainVideoRef) {
      if (isPlaying) {
        mainVideoRef.pause()
      } else {
        mainVideoRef.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (mainVideoRef) {
      mainVideoRef.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('showcase')
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleSmallVideoPlay = (index: number) => {
    // Stop main video if playing
    if (mainVideoRef && isPlaying) {
      mainVideoRef.pause()
      setIsPlaying(false)
    }

    // Stop other small videos
    smallVideoRefs.forEach((ref, i) => {
      if (ref && i !== index) {
        ref.pause()
      }
    })

    // Play selected small video
    const videoRef = smallVideoRefs[index]
    if (videoRef) {
      if (playingSmallVideo === index) {
        videoRef.pause()
        setPlayingSmallVideo(null)
      } else {
        videoRef.play()
        setPlayingSmallVideo(index)
      }
    }
  }

  const handleReelSelect = (reel: typeof reels[0]) => {
    setSelectedReel(reel)
    setIsPlaying(false)
    setPlayingSmallVideo(null)
    
    // Stop all small videos
    smallVideoRefs.forEach((ref) => {
      if (ref) {
        ref.pause()
      }
    })
  }

  const handleMainVideoClick = () => {
    if (mainVideoRef) {
      if (isPlaying) {
        mainVideoRef.pause()
      } else {
        // Stop all small videos first
        smallVideoRefs.forEach((ref) => {
          if (ref) {
            ref.pause()
          }
        })
        setPlayingSmallVideo(null)
        
        // Play main video
        mainVideoRef.play()
      }
    }
  }

  return (
    <section 
      id="reels" 
      className="relative py-24 bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-premium ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Short-Form Content
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Engaging <span className="bg-gradient-primary bg-clip-text text-transparent">Reels</span> That Convert
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Bite-sized content that packs a punch. Our reels are designed to capture attention, 
            drive engagement, and deliver your message in seconds.
          </p>
        </div>

        {/* Main Featured Video */}
        <div className="mb-12">
          <Card className="overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group max-w-4xl mx-auto">
            <div className="relative aspect-video">
              <video
                ref={setMainVideoRef}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={selectedReel.videoUrl}
                muted={isMuted}
                preload="metadata"
                onEnded={handleVideoEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Video Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/20 dark:bg-black/30 transition-all duration-300 group-hover:bg-black/10" />
              )}
              
              {/* Play/Pause Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handleMainVideoClick}
                  className="bg-white/20 dark:bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 h-16 w-16 rounded-full p-0 shadow-lg group-hover:scale-110 flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white" />
                  )}
                </button>
              </div>

              {/* Audio Control */}
              <div className="absolute top-6 right-6">
                <button
                  onClick={handleMuteToggle}
                  className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-black/60"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>

              {/* Video Status Indicator */}
              <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white/80 text-sm">
                  {isPlaying ? 'Playing' : 'Paused'}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* 4 Smaller Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reels.map((reel, index) => (
            <Card 
              key={reel.id}
              className={`cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:scale-105 group ${
                selectedReel.id === reel.id ? 'ring-2 ring-accent shadow-glow' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                transform: `translateY(${isVisible ? 0 : 20}px)`
              }}
              onClick={() => setSelectedReel(reel)}
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={reel.videoUrl}
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/10" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-2 shadow-lg flex items-center justify-center">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Watch Our Showreel Button */}
        <div className={`text-center transition-all duration-1000 ease-premium ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '800ms' }}>
          <Button 
            onClick={scrollToShowcase}
            className="bg-gradient-primary hover:bg-gradient-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            Watch Our Showreel
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  )
} 