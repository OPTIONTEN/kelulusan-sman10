"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { validateStudent } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function LoginForm() {
  const router = useRouter()
  const [nisn, setNisn] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nisn || !dateOfBirth) {
      setError("NISN dan Tanggal Lahir harus diisi")
      return
    }

    setLoading(true)
    setError("")

    try {
      const result = await validateStudent(nisn, dateOfBirth)

      if (result.success) {
        router.push(`/announcement/${nisn}`)
      } else {
        setError("NISN atau Tanggal Lahir tidak valid")
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "") // Hapus karakter non-numerik

    // Menambahkan strip setelah 2 digit, 2 digit, dan 4 digit
    if (value.length > 2 && value.length <= 4) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`
    } else if (value.length > 4) {
      value = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 8)}`
    }

    setDateOfBirth(value)
  }

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
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-blue-700">🎓 Pengumuman Kelulusan SMAN 10 Kota Bekasi 🎓</h1>
        <p className="text-gray-600">Silakan masukkan NISN dan Tanggal Lahir untuk melihat hasil kelulusan</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div variants={item} className="space-y-2">
          <Label htmlFor="nisn" className="text-blue-800">
            NISN
          </Label>
          <Input
            id="nisn"
            placeholder="Masukkan NISN"
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            required
            className="h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <Label htmlFor="dob" className="text-blue-800">
            Tanggal Lahir (DD-MM-YYYY)
          </Label>
          <Input
            id="dob"
            placeholder="Contoh: 28-07-2007"
            value={dateOfBirth}
            onChange={handleDateChange}
            onInput={handleDateChange}
            pattern="\d{2}-\d{2}-\d{4}"
            maxLength={10}
            inputMode="numeric"
            required
            className="h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          />
          <p className="text-xs text-gray-500">Format: Tanggal-Bulan-Tahun (contoh: 28-07-2007)</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}

        <motion.div variants={item}>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 h-12 text-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
