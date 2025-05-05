"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import CountdownTimer from "@/components/countdown-timer"
import LoginForm from "@/components/login-form"
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showCountdown, setShowCountdown] = useState(true)
  const [loading, setLoading] = useState(true)

  // Announcement date and time (May 5, 2025, 16:00 WIB)
  const announcementDate = new Date("2025-05-05T16:00:00+07:00")

  // Secret bypass code
  const BYPASS_CODE = "020202"

  useEffect(() => {
    // Check if bypass parameter is present and valid
    const bypassParam = searchParams.get("bypass")

    if (bypassParam === BYPASS_CODE) {
      // Bypass the countdown if the code matches
      setShowCountdown(false)
      setLoading(false)
      return
    }

    // Normal flow - check if current time is before announcement time
    const now = new Date()
    const isBeforeAnnouncement = now < announcementDate
    setShowCountdown(isBeforeAnnouncement)
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-fit w-96 rounded-lg bg-white p-8 shadow-xl"
      >
        {showCountdown ? (
          <CountdownTimer targetDate={announcementDate} onComplete={() => setShowCountdown(false)} />
        ) : (
          <LoginForm />
        )}
      </motion.div>
    </main>
  )
}
