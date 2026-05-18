"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Package, List, Plus, ClipboardList, FolderTree } from "lucide-react"

const navItems = [
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/products/new", label: "Добавить товар", icon: Plus },
  { href: "/admin/categories", label: "Категории", icon: FolderTree },
  { href: "/admin/orders", label: "Заказы", icon: ClipboardList },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") return <div className="text-center py-20">Загрузка...</div>
  if (status === "unauthenticated" || (session?.user as any)?.role !== "ADMIN") {
    router.push("/")
    return null
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
      </div>
      <div className="flex gap-8">
        <nav className="w-56 shrink-0 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="h-4 w-4 text-gray-400" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
