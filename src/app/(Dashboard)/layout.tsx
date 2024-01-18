import SidebarDrawer from "@/components/Drawer/SidebarDrawer"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard - Music Libray System",
  description:
    "Music library system using nextjs, mui, tailwind and typescript",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body
        style={
          {
            // backgroundColor: "#00000005",
          }
        }
      >
        <section className="bg-white max-w-7xl mx-auto grid grid-cols-1 gap-1 md:grid-cols-[300px_1fr] min-h-screen">
          <SidebarDrawer />
          {children}
        </section>
      </body>
    </html>
  )
}
