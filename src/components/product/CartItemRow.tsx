"use client"

import Link from "next/link"
import { Trash2, Eye } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/components/layout/CartProvider"

export function CartItemRow({ productId, name, price, quantity }: {
  productId: number
  name: string
  price: number
  quantity: number
}) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
        <Eye className="h-8 w-8 text-gray-300" />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${productId}`} className="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-1">
          {name}
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">{formatPrice(price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(productId, quantity - 1)}
          className="h-8 w-8 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => updateQuantity(productId, quantity + 1)}
          className="h-8 w-8 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
      <div className="text-right w-24">
        <p className="text-sm font-semibold text-gray-900">{formatPrice(price * quantity)}</p>
      </div>
      <button
        onClick={() => removeItem(productId)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
