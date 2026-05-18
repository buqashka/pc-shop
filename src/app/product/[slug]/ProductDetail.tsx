"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Check, ChevronLeft } from "lucide-react"
import { useCart } from "@/components/layout/CartProvider"
import { ProductCard } from "@/components/ui/ProductCard"
import { formatPrice } from "@/lib/utils"

type ProductDetailProps = {
  product: {
    id: number
    name: string
    slug: string
    description: string | null
    price: number
    oldPrice: number | null
    stock: number
    images: string[]
    specs: Record<string, string>
    category: string
    brand: string
  }
  relatedProducts: {
    id: number
    name: string
    slug: string
    price: number
    oldPrice: number | null
    image: string
    stock: number
    specs: Record<string, string> | null
    categorySlug?: string
  }[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] || "" })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const specEntries = product.specs ? Object.entries(product.specs) : []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/catalog" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-400 mb-6">
        <ChevronLeft className="h-4 w-4" />
        Назад в каталог
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="aspect-square bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-800">
          {product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} width={600} height={600} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="h-24 w-24 text-gray-700" />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-white bg-gray-700 px-2 py-0.5 rounded">{product.brand}</span>
            <span className="text-xs text-gray-400">{product.category}</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">{product.name}</h1>

          {product.description && (
            <p className="text-gray-400 mb-6">{product.description}</p>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6">
            {product.stock > 0 ? (
              <span className="flex items-center gap-1 text-sm text-green-400">
                <Check className="h-4 w-4" />
                В наличии: {product.stock} шт.
              </span>
            ) : (
              <span className="text-sm text-red-400">Нет в наличии</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary gap-2 w-full sm:w-auto"
          >
            {added ? (
              <>В корзине <Check className="h-4 w-4" /></>
            ) : (
              <>В корзину <ShoppingCart className="h-4 w-4" /></>
            )}
          </button>

          {specEntries.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-white mb-4">Характеристики</h2>
              <div className="space-y-2">
                {specEntries.map(([key, val]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-sm text-gray-400">{key}</span>
                    <span className="text-sm font-medium text-gray-200">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Похожие товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
