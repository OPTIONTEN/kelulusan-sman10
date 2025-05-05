"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface DateInputOTPProps {
  onChange: (value: string) => void
}

export default function DateInputOTP({ onChange }: DateInputOTPProps) {
  const [dateValues, setDateValues] = useState<string[]>(Array(8).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Format the date as DD-MM-YYYY for validation
  useEffect(() => {
    if (dateValues.every((val) => val !== "")) {
      const day = dateValues[0] + dateValues[1]
      const month = dateValues[2] + dateValues[3]
      const year = dateValues[4] + dateValues[5] + dateValues[6] + dateValues[7]
      onChange(`${day}-${month}-${year}`)
    }
  }, [dateValues, onChange])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newValues = [...dateValues]
    newValues[index] = value.slice(-1) // Take only the last character

    setDateValues(newValues)

    // Auto-focus next input if value is entered
    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !dateValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move to next input on right arrow
    if (e.key === "ArrowRight" && index < 7) {
      inputRefs.current[index + 1]?.focus()
    }

    // Move to previous input on left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").replace(/[^\d]/g, "").slice(0, 8)

    if (pastedData) {
      const newValues = [...dateValues]
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 8) {
          newValues[i] = pastedData[i]
        }
      }
      setDateValues(newValues)

      // Focus the next empty input or the last input
      const nextEmptyIndex = newValues.findIndex((val) => val === "")
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus()
      } else {
        inputRefs.current[7]?.focus()
      }
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex items-center justify-center space-x-2"
      onPaste={handlePaste}
    >
      {/* Day */}
      <motion.div variants={item}>
        <Input
          ref={(el) => (inputRefs.current[0] = el)}
          className="h-12 w-12 text-center text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
          value={dateValues[0]}
          onChange={(e) => handleChange(0, e.target.value)}
          onKeyDown={(e) => handleKeyDown(0, e)}
          maxLength={1}
          inputMode="numeric"
          aria-label="Day digit 1"
        />
      </motion.div>
      <motion.div variants={item}>
        <Input
          ref={(el) => (inputRefs.current[1] = el)}
          className="h-12 w-12 text-center text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
          value={dateValues[1]}
          onChange={(e) => handleChange(1, e.target.value)}
          onKeyDown={(e) => handleKeyDown(1, e)}
          maxLength={1}
          inputMode="numeric"
          aria-label="Day digit 2"
        />
      </motion.div>

      <motion.div variants={item} className="text-xl font-bold text-blue-500">
        -
      </motion.div>

      {/* Month */}
      <motion.div variants={item}>
        <Input
          ref={(el) => (inputRefs.current[2] = el)}
          className="h-12 w-12 text-center text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
          value={dateValues[2]}
          onChange={(e) => handleChange(2, e.target.value)}
          onKeyDown={(e) => handleKeyDown(2, e)}
          maxLength={1}
          inputMode="numeric"
          aria-label="Month digit 1"
        />
      </motion.div>
      <motion.div variants={item}>
        <Input
          ref={(el) => (inputRefs.current[3] = el)}
          className="h-12 w-12 text-center text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
          value={dateValues[3]}
          onChange={(e) => handleChange(3, e.target.value)}
          onKeyDown={(e) => handleKeyDown(3, e)}
          maxLength={1}
          inputMode="numeric"
          aria-label="Month digit 2"
        />
      </motion.div>

      <motion.div variants={item} className="text-xl font-bold text-blue-500">
        -
      </motion.div>

      {/* Year */}
      <motion.div variants={item}>
        <Input
          ref={(el) => (inputRefs.current[4] = el)}
          className="h-12 w-12 text-center text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
          value={dateValues[4]}
          onChange={(e) => handleChange(4, e.target.value)}
          onKeyDown={(e) => handleKeyDown(4, e)}
          maxLength={1}
          inputMode="numeric"
          aria-label="Year digit 1"
        />
      </motion.div>
      <motion.div variants={item}>
        <Input
          ref={(el) => (inputRefs.current[5] = el)}
          className="h-12 w-12 text-center text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
          value={dateValues[5]}
          onChange={(e) => handleChange(5, e.target.value)}
          onKeyDown={(e) => handleKeyDown(5, e)}
          maxLength={1}
          inputMode="numeric"
          aria-label="Year digit 2"
        />
      </motion.div>
      <motion.div variants={item}>
        <Input
          ref={(el) => (inputRefs.current[6] = el)}
          className="h-12 w-12 text-center text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
          value={dateValues[6]}
          onChange={(e) => handleChange(6, e.target.value)}
          onKeyDown={(e) => handleKeyDown(6, e)}
          maxLength={1}
          inputMode="numeric"
          aria-label="Year digit 3"
        />
      </motion.div>
      <motion.div variants={item}>
        <Input
          ref={(el) => (inputRefs.current[7] = el)}
          className="h-12 w-12 text-center text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
          value={dateValues[7]}
          onChange={(e) => handleChange(7, e.target.value)}
          onKeyDown={(e) => handleKeyDown(7, e)}
          maxLength={1}
          inputMode="numeric"
          aria-label="Year digit 4"
        />
      </motion.div>
    </motion.div>
  )
}
