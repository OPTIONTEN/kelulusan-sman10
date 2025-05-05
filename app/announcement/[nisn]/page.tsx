import { getStudentData } from "@/app/actions"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ConfettiCelebration from "@/components/confetti-celebration"

export default async function AnnouncementPage({ params }: { params: { nisn: string } }) {
  const student = await getStudentData(params.nisn)

  if (!student) {
    redirect("/")   
  }

  const isPassed = student.status === "LULUS"

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      {isPassed && <ConfettiCelebration trigger={true} />}

      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-blue-700">🎓 Pengumuman Kelulusan 🎓</h1>
          <p className="text-gray-600">SMA Tahun 2025</p>
        </div>

        <div className="mb-8 overflow-hidden rounded-lg border shadow-md">
          <div className="bg-blue-600 p-4 text-center text-xl font-bold text-white">Data Siswa</div>

          <div className="divide-y">
            <div className="grid grid-cols-3 p-4">
              <div className="font-semibold text-blue-800">NIS</div>
              <div className="col-span-2">{student.nis}</div>
            </div>
            <div className="grid grid-cols-3 p-4">
              <div className="font-semibold text-blue-800">NISN</div>
              <div className="col-span-2">{student.nisn}</div>
            </div>
            <div className="grid grid-cols-3 p-4">
              <div className="font-semibold text-blue-800">Nama</div>
              <div className="col-span-2 font-medium">{student.name}</div>
            </div>
            <div className="grid grid-cols-3 p-4">
              <div className="font-semibold text-blue-800">Jenis Kelamin</div>
              <div className="col-span-2">{student.gender}</div>
            </div>
            <div className="grid grid-cols-3 p-4">
              <div className="font-semibold text-blue-800">Kelas</div>
              <div className="col-span-2">{student.class}</div>
            </div>
            <div className="grid grid-cols-3 p-4">
              <div className="font-semibold text-blue-800">Tempat, Tanggal Lahir</div>
              <div className="col-span-2">
                {student.placeOfBirth}, {student.dateOfBirth}
              </div>
            </div>
            <div className="grid grid-cols-3 p-4">
              <div className="font-semibold text-blue-800">Alamat</div>
              <div className="col-span-2">{student.address}</div>
            </div>
          </div>
        </div>

        <div
          className={`mb-8 rounded-lg border-4 ${isPassed ? "border-blue-600" : "border-red-600"} p-6 text-center shadow-md transition-all duration-300 hover:shadow-lg`}
        >
          <div className="mb-2 text-lg font-semibold">STATUS:</div>
          <div className={`text-4xl font-bold ${isPassed ? "text-blue-700" : "text-red-700"}`}>{student.status}</div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 text-center text-gray-700 shadow-inner">
          <p>
            Ket: Untuk pengambilan SKL (Surat Keterangan Lulus) dan Raport, silakan menunggu informasi dari sekolah.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
              Kembali ke Halaman Utama
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
