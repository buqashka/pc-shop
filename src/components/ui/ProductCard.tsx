"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/layout/CartProvider"
import { ProductImage } from "./ProductImage"
import { formatPrice } from "@/lib/utils"

type ProductCardProps = {
  id: number
  name: string
  slug: string
  price: number
  oldPrice?: number | null
  image: string
  stock: number
  specs?: Record<string, string> | null
  categorySlug?: string
}

export function ProductCard({ id, name, slug, price, oldPrice, image, stock, specs, categorySlug }: ProductCardProps) {
  const { addItem } = useCart()

  const firstSpecs = specs ? Object.entries(specs).slice(0, 3) : []

  return (
    <div className="card group flex flex-col overflow-hidden">
      <Link href={`/product/${slug}`} className="relative aspect-square overflow-hidden">
        <ProductImage slug={slug} category={categorySlug} className="w-full h-full" />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {oldPrice && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round((1 - price / oldPrice) * 100)}%
            </span>
          )}
          {stock <= 5 && stock > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Мало
            </span>
          )}
        </div>
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Нет в наличии</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${slug}`}>
          <h3 className="text-sm font-medium text-gray-200 line-clamp-2 hover:text-primary-400 transition-colors mb-2">
            {name}
          </h3>
        </Link>
        {firstSpecs.length > 0 && (
          <div className="mb-3 space-y-0.5">
            {firstSpecs.map(([key, val]) => (
              <div key={key} className="flex justify-between text-xs text-gray-500">
                <span>{key}</span>
                <span className="text-gray-400">{String(val)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-white">{formatPrice(price)}</span>
            {oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(oldPrice)}</span>
            )}
          </div>
          <button
            onClick={() => addItem({ id, name, price, image: "" })}
            disabled={stock === 0}
            className="btn-primary !p-2 !rounded-lg"
            title="В корзину"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
