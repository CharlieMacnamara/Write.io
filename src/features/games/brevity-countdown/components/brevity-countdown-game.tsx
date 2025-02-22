'use client'

import { useState } from 'react'
import { BrevityCountdownStart } from './brevity-countdown-start'
import { BrevityCountdownPlay } from './brevity-countdown-play'
import { useBrevityCountdownStore } from '../store/brevity-countdown-store'

export function BrevityCountdownGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  
  if (!isPlaying) {
    return <BrevityCountdownStart onStart={() => setIsPlaying(true)} />
  }

  return <BrevityCountdownPlay onExit={() => setIsPlaying(false)} />
} 