"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: Date
  onComplete: () => void
}

export default function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        onComplete()
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="mb-3 text-3xl font-bold text-blue-700">🎓 Pengumuman Kelulusan SMA Tahun 2025 🎓</h1>
        <p className="text-lg text-gray-700">Hasil kelulusan akan tersedia dalam:</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mb-8 grid grid-cols-4 gap-3 text-center"
      >
        <motion.div variants={item} className="rounded-lg bg-blue-100 p-4 shadow-md">
          <div className="text-3xl font-bold text-blue-800">{timeLeft.days}</div>
          <div className="text-sm text-blue-600">Hari</div>
        </motion.div>
        <motion.div variants={item} className="rounded-lg bg-blue-100 p-4 shadow-md">
          <div className="text-3xl font-bold text-blue-800">{timeLeft.hours}</div>
          <div className="text-sm text-blue-600">Jam</div>
        </motion.div>
        <motion.div variants={item} className="rounded-lg bg-blue-100 p-4 shadow-md">
          <div className="text-3xl font-bold text-blue-800">{timeLeft.minutes}</div>
          <div className="text-sm text-blue-600">Menit</div>
        </motion.div>
        <motion.div variants={item} className="rounded-lg bg-blue-100 p-4 shadow-md">
          <div className="text-3xl font-bold text-blue-800">{timeLeft.seconds}</div>
          <div className="text-sm text-blue-600">Detik</div>
        </motion.div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-gray-600">
        Silahkan kembali pada tanggal 5 Mei 2025 pukul 16:00 WIB untuk melihat hasil kelulusan.
      </motion.p>
    </div>
  )
}
