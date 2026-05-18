"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Eye } from "lucide-react"
import { formatPrice } from "@/lib/utils"

type Product = {
  id: number
  name: string
  slug: string
  price: number
  stock: number
  isActive: boolean
  category: { name: string }
  brand: { name: string }
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products?all=true")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || data))
      .finally(() => setLoading(false))
  }, [])

  const toggleActive = async (id: number, current: boolean) => {
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !current }),
    })
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !current } : p)))
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Загрузка...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Управление товарами</h2>
        <Link href="/admin/products/new" className="btn-primary gap-2 !py-2 !px-4">
          <Plus className="h-4 w-4" />
          Добавить
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Товар</th>
              <th className="text-left p-4 font-medium text-gray-500">Категория</th>
              <th className="text-left p-4 font-medium text-gray-500">Бренд</th>
              <th className="text-right p-4 font-medium text-gray-500">Цена</th>
              <th className="text-right p-4 font-medium text-gray-500">Остаток</th>
              <th className="text-center p-4 font-medium text-gray-500">Статус</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{p.name}</td>
                <td className="p-4 text-gray-500">{p.category?.name}</td>
                <td className="p-4 text-gray-500">{p.brand?.name}</td>
                <td className="p-4 text-right">{formatPrice(Number(p.price))}</td>
                <td className="p-4 text-right">{p.stock}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => toggleActive(p.id, p.isActive)}
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.isActive ? "Активен" : "Скрыт"}
                  </button>
                </td>
                <td className="p-4">
                  <Link href={`/admin/products/${p.id}`} className="text-primary-600 hover:text-primary-700">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
