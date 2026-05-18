"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, X } from "lucide-react"
import { useState } from "react"

type FilterProps = {
  categories: { id: number; name: string; slug: string }[]
  brands: { id: number; name: string; slug: string }[]
  currentCategory?: string
}

export function CatalogFilters({ categories, brands, currentCategory }: FilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentBrand = searchParams.get("brand")
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const currentSort = searchParams.get("sort") || "newest"

  const buildUrl = (params: Record<string, string | null>) => {
    const sp = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, val]) => {
      if (val === null) sp.delete(key)
      else sp.set(key, val)
    })
    const qs = sp.toString()
    return `/catalog${currentCategory ? `/${currentCategory}` : ""}${qs ? `?${qs}` : ""}`
  }

  const FilterContent = () => (
    <>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Категории</h3>
        <div className="space-y-1">
          <a
            href={currentCategory ? `/catalog${searchParams.toString() ? `?${searchParams.toString()}` : ""}` : "/catalog"}
            className={`block text-sm px-3 py-1.5 rounded transition-colors ${!currentCategory ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:text-gray-900"}`}
          >
            Все товары
          </a>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/catalog/${cat.slug}`}
              className={`block text-sm px-3 py-1.5 rounded transition-colors ${currentCategory === cat.slug ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:text-gray-900"}`}
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Бренд</h3>
        <div className="space-y-1">
          <a
            href={buildUrl({ brand: null })}
            className={`block text-sm px-3 py-1.5 rounded ${!currentBrand ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:text-gray-900"}`}
          >
            Все
          </a>
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={buildUrl({ brand: brand.slug })}
              className={`block text-sm px-3 py-1.5 rounded ${currentBrand === brand.slug ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:text-gray-900"}`}
            >
              {brand.name}
            </a>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Цена</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="от"
            defaultValue={minPrice}
            className="input-field !py-1.5 text-sm w-full"
            onBlur={(e) => {
              const val = e.target.value
              router.push(buildUrl({ minPrice: val || null }))
            }}
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            placeholder="до"
            defaultValue={maxPrice}
            className="input-field !py-1.5 text-sm w-full"
            onBlur={(e) => {
              const val = e.target.value
              router.push(buildUrl({ maxPrice: val || null }))
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Сортировка</h3>
        <div className="space-y-1">
          {[
            { value: "newest", label: "Новинки" },
            { value: "price_asc", label: "Цена: по возрастанию" },
            { value: "price_desc", label: "Цена: по убыванию" },
            { value: "name", label: "По названию" },
          ].map((opt) => (
            <a
              key={opt.value}
              href={buildUrl({ sort: opt.value })}
              className={`block text-sm px-3 py-1.5 rounded ${currentSort === opt.value ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-600 hover:text-gray-900"}`}
            >
              {opt.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden btn-secondary gap-2 w-full mb-4"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Фильтры
      </button>

      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20">
          <FilterContent />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Фильтры</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  )
}
