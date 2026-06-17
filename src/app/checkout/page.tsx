"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/layout/CartProvider"
import { formatPrice } from "@/lib/utils"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
    paymentMethod: "card",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const orderData = {
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, price: i.price })),
      total: totalPrice,
      shippingAddress: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        comment: form.comment,
      }),
      paymentMethod: form.paymentMethod,
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (res.ok) {
        clearCart()
        router.push("/account/orders?success=true")
      } else {
        const data = await res.json()
        setError(data.error || "Ошибка при создании заказа")
      }
    } catch (err) {
      console.error(err)
      setError("Ошибка при создании заказа")
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  if (items.length === 0) return null

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Контактные данные</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  placeholder="ivan@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Доставка</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Адрес доставки</label>
              <textarea
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="г. Москва, ул. Ленина, д. 10, кв. 5"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий к заказу</label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="input-field"
                rows={2}
                placeholder="Удобное время доставки, пожелания..."
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Способ оплаты</h2>
            <div className="space-y-2">
              {[
                { value: "card", label: "Банковской картой (онлайн)" },
                { value: "cash", label: "Наличными при получении" },
                { value: "transfer", label: "Банковский перевод" },
              ].map((method) => (
                <label key={method.value} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={form.paymentMethod === method.value}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="h-4 w-4 text-primary-600"
                  />
                  <span className="text-sm text-gray-900">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Ваш заказ</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate mr-2">{item.name} x{item.quantity}</span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between mb-6">
            <span className="font-semibold">Итого</span>
            <span className="font-bold text-xl">{formatPrice(totalPrice)}</span>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full"
          >
            {submitting ? "Оформление..." : "Подтвердить заказ"}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Нажимая &quot;Подтвердить заказ&quot;, вы соглашаетесь с условиями обработки данных
          </p>
        </div>
      </form>
    </div>
  )
}
