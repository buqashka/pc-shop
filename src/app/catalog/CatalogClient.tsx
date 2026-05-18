"use client"

import { ProductCard } from "@/components/ui/ProductCard"
import { CatalogFilters } from "@/components/catalog/CatalogFilters"

type CatalogClientProps = {
  categories: { id: number; name: string; slug: string }[]
  brands: { id: number; name: string; slug: string }[]
  products: {
    id: number
    name: string
    slug: string
    price: number
    oldPrice: number | null
    image: string
    stock: number
    specs: Record<string, string> | null
    brandName: string
    categorySlug?: string
  }[]
  total: number
  totalPages: number
  currentPage: number
  currentCategory?: string
}

export function CatalogClient({
  categories,
  brands,
  products,
  total,
  totalPages,
  currentPage,
  currentCategory,
}: CatalogClientProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentCategory
            ? categories.find((c) => c.slug === currentCategory)?.name
            : "Все товары"}
        </h1>
        <p className="text-sm text-gray-500">{total} товаров</p>
      </div>

      <div className="flex gap-8">
        <CatalogFilters
          categories={categories}
          brands={brands}
          currentCategory={currentCategory}
        />

        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Товары не найдены</p>
              <p className="text-gray-400 text-sm mt-1">Попробуйте изменить параметры фильтрации</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`/catalog${currentCategory ? `/${currentCategory}` : ""}?page=${p}`}
                      className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "bg-primary-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
