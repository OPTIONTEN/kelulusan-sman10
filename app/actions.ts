"use server";

import { students } from "@/lib/data";

const bulanMap: Record<string, string> = {
  Januari: "01",
  Februari: "02",
  Maret: "03",
  April: "04",
  Mei: "05",
  Juni: "06",
  Juli: "07",
  Agustus: "08",
  September: "09",
  Oktober: "10",
  November: "11",
  Desember: "12",
};

function convertIndonesianDateToIso(dateStr: string): string | null {
  const match = dateStr.match(/^(\d{2}) (\w+) (\d{4})$/);
  if (!match) return null;

  const [, day, monthName, year] = match;
  const month = bulanMap[monthName];
  if (!month) return null;

  return `${day}-${month}-${year}`;
}

export async function validateStudent(nisn: string, dateOfBirth: string) {
  // Simulate database lookup with a small delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const student = students.find((s) => s.nisn === nisn);

  if (!student) {
    return { success: false, error: "Invalid NISN" };
  }

  const formattedDateOfBirth = convertIndonesianDateToIso(student.dateOfBirth);

  if (!formattedDateOfBirth) {
    return { success: false, error: "Invalid date format in database" };
  }

  if (formattedDateOfBirth !== dateOfBirth) {
    return { success: false, error: "Invalid date of birth" };
  }

  return { success: true };
}

export async function getStudentData(nisn: string) {
  // Simulate database lookup
  const student = students.find((s) => s.nisn === nisn);

  if (!student) {
    return null;
  }

  return student;
}
