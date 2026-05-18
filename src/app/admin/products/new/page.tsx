"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    oldPrice: "",
    stock: "0",
    categoryId: "",
    brandId: "",
    specs: "",
  })

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/brands").then((r) => r.json()),
    ]).then(([cats, brs]) => {
      setCategories(cats)
      setBrands(brs)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    let specsObj = {}
    try {
      if (form.specs.trim()) specsObj = JSON.parse(form.specs)
    } catch { /* empty */ }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        description: form.description,
        price: parseFloat(form.price),
        oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
        stock: parseInt(form.stock),
        categoryId: parseInt(form.categoryId),
        brandId: parseInt(form.brandId),
        specs: specsObj,
      }),
    })

    if (res.ok) {
      router.push("/admin/products")
    }
    setSubmitting(false)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Новый товар</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-field" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows={3} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₽)</label>
            <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Старая цена</label>
            <input type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Остаток</label>
            <input required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
            <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="input-field">
              <option value="">Выберите</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Бренд</label>
            <select required value={form.brandId} onChange={(e) => setForm({ ...form, brandId: e.target.value })} className="input-field">
              <option value="">Выберите</option>
              {brands.map((b: any) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Характеристики (JSON)</label>
          <textarea value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} className="input-field" rows={4} placeholder='{"cores": 8, "frequency": "3.6 ГГц"}' />
        </div>

        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Сохранение..." : "Создать товар"}
        </button>
      </form>
    </div>
  )
}
