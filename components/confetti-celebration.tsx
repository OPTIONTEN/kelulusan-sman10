"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

interface ConfettiCelebrationProps {
  trigger: boolean
}

export default function ConfettiCelebration({ trigger }: ConfettiCelebrationProps) {
  const [fired, setFired] = useState(false)

  useEffect(() => {
    if (trigger && !fired) {
      setFired(true)

      // Fire initial burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      // Fire multiple bursts for a more impressive effect
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        })
      }, 200)

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        })
      }, 400)

      // School colors
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#1e40af", "#3b82f6", "#93c5fd"],
        })
      }, 600)
    }
  }, [trigger, fired])

  return null
}
