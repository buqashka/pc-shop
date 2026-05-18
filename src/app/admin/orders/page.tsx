"use client"

import { useEffect, useState } from "react"
import { formatPrice, parseAddress } from "@/lib/utils"

const statuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]
const statusLabels: Record<string, string> = {
  PENDING: "Ожидает", CONFIRMED: "Подтверждён", PROCESSING: "Собирается",
  SHIPPED: "Отправлен", DELIVERED: "Доставлен", CANCELLED: "Отменён",
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/orders?all=true")
      .then((r) => r.json())
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Загрузка...</div>

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Управление заказами</h2>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-sm font-medium">Заказ #{order.id}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString("ru-RU")}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">{order.user?.name || order.user?.email}</span>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="input-field !w-auto !py-1.5 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600 mb-3">
              {order.shippingAddress && (
                <p>Адрес: {parseAddress(order.shippingAddress).address}</p>
              )}
              <p>Оплата: {order.paymentMethod === "card" ? "Карта" : "Наличные"}</p>
            </div>

            <div className="space-y-1">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                  <span>{formatPrice(Number(item.price) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
              <span>Итого</span>
              <span>{formatPrice(Number(order.total))}</span>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-gray-500 text-center py-8">Нет заказов</p>}
      </div>
    </div>
  )
}
