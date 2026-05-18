"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .finally(() => setLoading(false))
  }, [])

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slug || name.toLowerCase().replace(/\s+/g, "-") }),
    })
    if (res.ok) {
      const cat = await res.json()
      setCategories((prev) => [...prev, cat])
      setName("")
      setSlug("")
    }
  }

  const deleteCategory = async (id: number) => {
    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Категории</h2>

      <form onSubmit={addCategory} className="flex gap-3 mb-6">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название категории"
          className="input-field flex-1"
        />
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="slug"
          className="input-field w-40"
        />
        <button type="submit" className="btn-primary gap-2">
          <Plus className="h-4 w-4" />
          Добавить
        </button>
      </form>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Название</th>
              <th className="text-left p-4 font-medium text-gray-500">Slug</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="p-4 font-medium text-gray-900">{cat.name}</td>
                <td className="p-4 text-gray-500">{cat.slug}</td>
                <td className="p-4 text-right">
                  <button onClick={() => deleteCategory(cat.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
