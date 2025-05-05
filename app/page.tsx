"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Construction } from "lucide-react"

// Environment variable to toggle maintenance mode
// You would set this in your .env file or deployment platform
const LAUNCH = process.env.NEXT_PUBLIC_LAUNCH === "1"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showCountdown, setShowCountdown] = useState(true)
  const [loading, setLoading] = useState(true)
  const [showMaintenance, setShowMaintenance] = useState(!LAUNCH)

  // Announcement date and time (May 5, 2025, 16:00 WIB)
  const announcementDate = new Date("2025-05-05T16:00:00+07:00")

  // Secret bypass code
  const BYPASS_CODE = "020202"

  useEffect(() => {
    // Check if bypass parameter is present and valid
    const bypassParam = searchParams.get("bypass")

    if (bypassParam === BYPASS_CODE) {
      // Bypass both maintenance and countdown if the code matches
      setShowMaintenance(false)
      setShowCountdown(false)
      setLoading(false)
      return
    }

    // Check if we should override maintenance based on query param
    const overrideParam = searchParams.get("override_maintenance")
    if (overrideParam === "true") {
      setShowMaintenance(false)
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

  // Show maintenance page if in maintenance mode
  if (showMaintenance) {
    return <MaintenancePage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <motion.article 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full text-center space-y-6"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          className="flex justify-center mb-4"
        >
          <Construction 
            className="text-blue-500" 
            size={64} 
            strokeWidth={1.5} 
          />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Situs Tidak Tersedia Sementara
        </h1>

        <div className="space-y-3 text-gray-600">
          <motion.p 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2"
          >
            Pemeliharaan terjadwal saat ini sedang berlangsung
          </motion.p>

          <motion.p
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Silakan periksa kembali nanti.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm text-gray-500"
        >
          Kami mohon maaf atas ketidaknyamanan yang ditimbulkan.
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-sm"
        >
          <Link 
            href="mailto:optionsman10bks@gmail.com" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Hubungi Dukungan
          </Link>
        </motion.footer>
      </motion.article>
    </div>
  )
}

// Maintenance page component
function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-fit max-w-md rounded-lg bg-white p-8 shadow-xl text-center"
      >
        <div className="mb-6">
          <svg 
            className="mx-auto h-16 w-16 text-blue-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          We're currently under maintenance
        </h1>
        <p className="mb-6 text-gray-600">
          We're working to improve our system and will be back online shortly. Thank you for your patience.
        </p>
        <p className="text-sm text-gray-500">
          Expected completion: May 5, 2025, 20.00 WIB
        </p>
      </motion.div>
    </main>
  )
}