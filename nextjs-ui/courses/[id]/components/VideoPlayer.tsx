'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

interface VideoPlayerProps {
  videoUrl: string
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  return (
    <div className="relative aspect-video mb-4">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={togglePlay}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-center space-x-4">
        <Button size="sm" variant="ghost" onClick={() => skip(-10)}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => skip(10)}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

