"use server"

import { students } from "@/lib/data"

export async function validateStudent(nisn: string, dateOfBirth: string) {
  // Simulate database lookup with a small delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const student = students.find((s) => s.nisn === nisn)

  if (!student) {
    return { success: false }
  }

  // Check if date of birth matches in dd-mm-yy format
  const formattedDateOfBirth = new Date(student.dateOfBirth).toLocaleDateString("en-GB").replace(/\//g, "-")
  if (formattedDateOfBirth === dateOfBirth) {
    return { success: true }
  }

  return { success: false }
}

export async function getStudentData(nisn: string) {
  // Simulate database lookup
  const student = students.find((s) => s.nisn === nisn)

  if (!student) {
    return null
  }

  return student
}
