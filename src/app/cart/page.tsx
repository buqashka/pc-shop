"use client"

import Link from "next/link"
import { ShoppingCart, ArrowRight, Trash2 } from "lucide-react"
import { useCart } from "@/components/layout/CartProvider"
import { CartItemRow } from "@/components/product/CartItemRow"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, totalPrice, totalItems, clearCart, isLoading } = useCart()

  if (isLoading) {
    return <div className="text-center py-20 text-gray-500">Загрузка...</div>
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h1>
        <p className="text-gray-500 mb-6">Добавьте товары в корзину, чтобы оформить заказ</p>
        <Link href="/catalog" className="btn-primary">
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Корзина ({totalItems} товаров)</h1>
        <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
          <Trash2 className="h-4 w-4" />
          Очистить
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              productId={item.productId}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Итого</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Товаров</span>
              <span>{totalItems} шт.</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold text-gray-900">Сумма</span>
              <span className="font-bold text-xl text-gray-900">{formatPrice(totalPrice)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-primary w-full gap-2">
            Оформить заказ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
