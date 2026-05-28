import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CartProvider } from "@/components/layout/CartProvider"
import { AuthProvider } from "@/components/layout/AuthProvider"

const inter = Inter({ subsets: ["cyrillic", "latin"] })

export const metadata: Metadata = {
  title: "PC-Shop | Интернет-магазин комплектующих для ПК",
  description: "Продажа процессоров, видеокарт, оперативной памяти и других комплектующих для компьютера",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col max-w-[100vw]">
              <Header />
              <main className="flex-1 overflow-x-hidden">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
