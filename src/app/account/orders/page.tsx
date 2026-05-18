"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Package, Eye } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

const statusLabels: Record<string, string> = {
  PENDING: "Ожидает подтверждения",
  CONFIRMED: "Подтверждён",
  PROCESSING: "Собирается",
  SHIPPED: "Отправлен",
  DELIVERED: "Доставлен",
  CANCELLED: "Отменён",
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-indigo-100 text-indigo-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login")
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((r) => r.json())
        .then(setOrders)
        .finally(() => setLoading(false))
    }
  }, [status, router])

  if (status === "loading" || loading) {
    return <div className="text-center py-20 text-gray-500">Загрузка...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">У вас ещё нет заказов</h1>
        <p className="text-gray-500 mb-6">Оформите первый заказ в нашем каталоге</p>
        <Link href="/catalog" className="btn-primary">
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Мои заказы</h1>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-sm text-gray-500">Заказ #{order.id}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString("ru-RU")}</span>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status] || ""}`}>
                {statusLabels[order.status] || order.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                    <Eye className="h-5 w-5 text-gray-300" />
                  </div>
                  <span className="flex-1 text-gray-700">{item.product.name}</span>
                  <span className="text-gray-500">{item.quantity} x {formatPrice(Number(item.price))}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Итого: {formatPrice(Number(order.total))}</span>
              <span className="text-sm text-gray-500">{order.paymentMethod === "card" ? "Карта" : "Наличные"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
