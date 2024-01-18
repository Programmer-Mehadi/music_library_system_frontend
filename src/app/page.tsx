import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - Music Libray System",
  description: "Music library system",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-10"></main>
  )
}
