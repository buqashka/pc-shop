"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, Search, X, Package, Monitor, Mouse, Keyboard, Headphones, ChevronDown } from "lucide-react"
import { useCart } from "./CartProvider"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

const mainCategories = [
  { name: "Процессоры", slug: "processory" },
  { name: "Видеокарты", slug: "videokarty" },
  { name: "Оперативная память", slug: "operativnaya-pamyat" },
  { name: "Материнские платы", slug: "materinskie-platy" },
  { name: "Накопители", slug: "nakopiteli" },
  { name: "Блоки питания", slug: "bloki-pitaniya" },
  { name: "Корпуса", slug: "korpusa" },
  { name: "Охлаждение", slug: "ohlazhdenie" },
]

const otherCategories = [
  { name: "Мониторы", slug: "monitory", icon: Monitor },
  { name: "Мыши", slug: "myshi", icon: Mouse },
  { name: "Клавиатуры", slug: "klaviatury", icon: Keyboard },
  { name: "Кабели", slug: "kabeli", icon: Package },
  { name: "Периферия", slug: "periferiya", icon: Headphones },
]

export function Header() {
  const { totalItems } = useCart()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMore, setShowMore] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Package className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white">PC-Shop</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {mainCategories.slice(0, 5).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/catalog/${cat.slug}`}
                  className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-default">
                  Ещё
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all absolute top-full left-0 pt-1 w-56">
                  <div className="rounded-xl border border-gray-700 bg-gray-900 py-2 shadow-xl shadow-black/50">
                    {[...mainCategories.slice(5), ...otherCategories].map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/catalog/${cat.slug}`}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <hr className="my-1 border-gray-800" />
                    <Link href="/catalog" className="block px-4 py-2.5 text-sm font-medium text-primary-400 hover:bg-white/5">
                      Все товары
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/builder" className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-accent-400 hover:bg-accent-500/10 rounded-lg transition-colors">
              Сборка ПК
            </Link>
            <Link href="/cart" className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm">{session.user?.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-gray-700 bg-gray-900 py-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/account/orders" className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                    Мои заказы
                  </Link>
                  {(session.user as any)?.role === "ADMIN" && (
                    <Link href="/admin/products" className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                      Админ-панель
                    </Link>
                  )}
                  <hr className="my-1 border-gray-800" />
                  <button onClick={() => signOut()} className="block w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5">
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-primary !py-2 !px-4 text-sm">
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-black px-4 pb-4 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-1 pt-3">
            <Link href="/catalog" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-semibold text-primary-400 rounded-lg hover:bg-white/5">
              Все товары
            </Link>
            <Link href="/builder" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-semibold text-accent-400 rounded-lg hover:bg-white/5">
              Конфигуратор ПК
            </Link>
            <hr className="my-1 border-gray-800" />
            {[...mainCategories, ...otherCategories].map((cat) => (
              <Link key={cat.slug} href={`/catalog/${cat.slug}`} onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm text-gray-400 rounded-lg hover:bg-white/5 hover:text-white">
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {searchOpen && (
        <div className="border-t border-gray-800 bg-black px-4 pb-4">
          <form onSubmit={handleSearch} className="mx-auto max-w-2xl flex gap-2 pt-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск: процессоры, видеокарты, мыши, клавиатуры..."
              className="input-field"
              autoFocus
            />
            <button type="submit" className="btn-primary">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  )
}
