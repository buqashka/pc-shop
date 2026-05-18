"use client"

import { useEffect, useState, useMemo } from "react"
import { Check, X, AlertTriangle, Plus, ShoppingCart, Search, SlidersHorizontal } from "lucide-react"
import { useCart } from "@/components/layout/CartProvider"
import { formatPrice } from "@/lib/utils"

type Product = {
  id: number
  name: string
  price: number
  stock: number
  specs: Record<string, string>
  brandName: string
  categoryName: string
}

type CompatibilityWarning = {
  type: "warning" | "error"
  message: string
}

const slots = [
  { key: "processory", label: "Процессор", required: true },
  { key: "materinskie-platy", label: "Материнская плата", required: true },
  { key: "operativnaya-pamyat", label: "Оперативная память", required: true },
  { key: "videokarty", label: "Видеокарта", required: false },
  { key: "nakopiteli", label: "Накопитель", required: true },
  { key: "bloki-pitaniya", label: "Блок питания", required: true },
  { key: "korpusa", label: "Корпус", required: true },
  { key: "ohlazhdenie", label: "Охлаждение", required: false },
]

function checkCompatibility(selection: Record<string, Product | null>): CompatibilityWarning[] {
  const warnings: CompatibilityWarning[] = []
  const cpu = selection["processory"]
  const mb = selection["materinskie-platy"]
  const ram = selection["operativnaya-pamyat"]
  const gpu = selection["videokarty"]
  const psu = selection["bloki-pitaniya"]

  if (cpu && mb) {
    const cpuSocket = cpu.specs?.socket
    const mbSocket = mb.specs?.socket
    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
      warnings.push({ type: "error", message: `Сокет процессора (${cpuSocket}) не совместим с сокетом материнской платы (${mbSocket})` })
    }
  }
  if (cpu && ram) {
    const cpuMem = cpu.specs?.memoryType || ""
    const ramType = ram.specs?.type || ""
    if (cpuMem && ramType && !cpuMem.includes(ramType) && !ramType.includes(cpuMem)) {
      warnings.push({ type: "warning", message: `Процессор (${cpuMem}) и память (${ramType}) могут быть несовместимы` })
    }
  }
  if (mb && ram) {
    const mbMem = mb.specs?.memoryType || ""
    const ramType = ram.specs?.type || ""
    if (mbMem && ramType && !mbMem.includes(ramType) && !ramType.includes(mbMem)) {
      warnings.push({ type: "error", message: `Материнская плата (${mbMem}) не поддерживает память ${ramType}` })
    }
  }
  if (gpu && psu) {
    const recPsu = gpu.specs?.recommendedPsu
    if (recPsu) {
      const psuPower = parseInt(psu.specs?.power || "0")
      const needed = parseInt(recPsu)
      if (psuPower && needed && psuPower < needed) {
        warnings.push({ type: "warning", message: `Блок питания ${psuPower}W может быть недостаточен для ${gpu.name} (рекомендуется от ${needed}W)` })
      }
    }
  }
  return warnings
}

function isCompatible(product: Product, slotKey: string, selection: Record<string, Product | null>): boolean {
  const cpu = selection["processory"]
  const mb = selection["materinskie-platy"]
  const ram = selection["operativnaya-pamyat"]

  if (slotKey === "materinskie-platy" && cpu) {
    const cpuSocket = cpu.specs?.socket
    const mbSocket = product.specs?.socket
    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) return false
  }
  if (slotKey === "processory" && mb) {
    const cpuSocket = product.specs?.socket
    const mbSocket = mb.specs?.socket
    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) return false
  }
  if (slotKey === "operativnaya-pamyat" && mb) {
    const ramType = product.specs?.type || ""
    const mbMem = mb.specs?.memoryType || ""
    if (mbMem && ramType && !mbMem.includes(ramType) && !ramType.includes(mbMem)) return false
  }
  if (slotKey === "operativnaya-pamyat" && cpu) {
    const ramType = product.specs?.type || ""
    const cpuMem = cpu.specs?.memoryType || ""
    if (cpuMem && ramType && !cpuMem.includes(ramType) && !ramType.includes(cpuMem)) return false
  }
  return true
}

export default function BuilderPage() {
  const { addItem } = useCart()
  const [allProducts, setAllProducts] = useState<Record<string, Product[]>>({})
  const [selection, setSelection] = useState<Record<string, Product | null>>({})
  const [activeSlot, setActiveSlot] = useState<string | null>(null)
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({})
  const [brandFilters, setBrandFilters] = useState<Record<string, string>>({})
  const [onlyCompatible, setOnlyCompatible] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/builder")
      .then((r) => r.json())
      .then(setAllProducts)
      .finally(() => setLoading(false))
  }, [])

  const warnings = useMemo(() => checkCompatibility(selection), [selection])

  const totalPrice = Object.values(selection).reduce((sum, p) => sum + (p?.price || 0), 0)
  const selectedCount = Object.values(selection).filter(Boolean).length
  const requiredCount = slots.filter((s) => s.required).length
  const canAddToCart = selectedCount >= requiredCount && warnings.filter((w) => w.type === "error").length === 0

  const handleAddAll = () => {
    Object.values(selection).forEach((product) => {
      if (product) addItem({ id: product.id, name: product.name, price: product.price, image: "" })
    })
  }

  const getFilteredProducts = (slotKey: string): Product[] => {
    let products = allProducts[slotKey] || []
    const search = (searchTerms[slotKey] || "").toLowerCase()
    const brand = brandFilters[slotKey] || ""

    if (search) {
      products = products.filter((p) => p.name.toLowerCase().includes(search))
    }
    if (brand) {
      products = products.filter((p) => p.brandName === brand)
    }
    if (onlyCompatible) {
      products = products.filter((p) => isCompatible(p, slotKey, selection))
    }
    return products
  }

  const getBrandsForSlot = (slotKey: string): string[] => {
    const products = allProducts[slotKey] || []
    return Array.from(new Set(products.map((p) => p.brandName))).sort()
  }

  const activeProducts = activeSlot ? getFilteredProducts(activeSlot) : []

  if (loading) return <div className="text-center py-20 text-gray-500">Загрузка конфигуратора...</div>

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Конфигуратор ПК</h1>
        <p className="text-gray-500">Выберите комплектующие — мы проверим совместимость и покажем только подходящие варианты</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={onlyCompatible}
            onChange={(e) => setOnlyCompatible(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="font-medium">Показывать только совместимые</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {slots.map((slot) => {
            const selected = selection[slot.key]
            const products = allProducts[slot.key] || []
            const brands = getBrandsForSlot(slot.key)
            const searchTerm = searchTerms[slot.key] || ""
            const brandFilter = brandFilters[slot.key] || ""
            const isOpen = activeSlot === slot.key

            return (
              <div key={slot.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setActiveSlot(isOpen ? null : slot.key)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-green-100" : "bg-gray-100"}`}>
                      {selected ? <Check className="h-4 w-4 text-green-600" /> : <Plus className="h-4 w-4 text-gray-400" />}
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-900">
                        {slot.label}
                        {slot.required && <span className="text-red-500 ml-0.5">*</span>}
                        <span className="text-xs text-gray-400 ml-2 font-normal">{products.length} шт.</span>
                      </span>
                      {selected && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate max-w-md">{selected.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {selected ? (
                      <span className="text-sm font-semibold text-gray-900">{formatPrice(selected.price)}</span>
                    ) : null}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t">
                    <div className="p-3 bg-gray-50 border-b flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Поиск..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerms({ ...searchTerms, [slot.key]: e.target.value })}
                          className="input-field !py-2 !pl-9 text-sm"
                        />
                      </div>
                      <select
                        value={brandFilter}
                        onChange={(e) => setBrandFilters({ ...brandFilters, [slot.key]: e.target.value })}
                        className="input-field !py-2 text-sm"
                      >
                        <option value="">Все бренды</option>
                        {brands.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    {selected && (
                      <div className="px-3 py-2 bg-blue-50 border-b flex items-center justify-between">
                        <span className="text-sm text-blue-700">Выбрано: {selected.name}</span>
                        <button onClick={() => setSelection((prev) => ({ ...prev, [slot.key]: null }))} className="text-xs text-red-600 hover:text-red-700">
                          Убрать
                        </button>
                      </div>
                    )}

                    <div className="max-h-72 overflow-y-auto">
                      {activeProducts.length === 0 ? (
                        <div className="p-8 text-center text-sm text-gray-400">
                          {searchTerm || brandFilter ? "Ничего не найдено. Попробуйте изменить фильтры." : "Нет доступных товаров в этой категории"}
                        </div>
                      ) : (
                        activeProducts.map((p) => {
                          const isSelected = selection[slot.key]?.id === p.id
                          const hasCompatibilityIssue = onlyCompatible && !isCompatible(p, slot.key, selection)
                          return (
                            <button
                              key={p.id}
                              onClick={() => {
                                if (hasCompatibilityIssue) return
                                setSelection((prev) => ({ ...prev, [slot.key]: p }))
                                setActiveSlot(null)
                              }}
                              disabled={hasCompatibilityIssue}
                              className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                                isSelected ? "bg-primary-50" : ""
                              } ${
                                hasCompatibilityIssue ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="text-left flex-1 min-w-0">
                                <p className={`font-medium truncate ${isSelected ? "text-primary-700" : "text-gray-900"}`}>
                                  {p.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {p.brandName}
                                  {p.stock > 0 ? ` • В наличии ${p.stock}` : " • Нет в наличии"}
                                  {hasCompatibilityIssue && " • Несовместим"}
                                </p>
                              </div>
                              <span className="font-semibold text-gray-900 ml-3 shrink-0">{formatPrice(p.price)}</span>
                            </button>
                          )
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Сборка</h2>

            <div className="space-y-2 mb-4 text-sm">
              {slots.map((slot) => {
                const selected = selection[slot.key]
                return (
                  <div key={slot.key} className="flex justify-between">
                    <span className="text-gray-500">{slot.label}:</span>
                    <span className="font-medium">{selected ? formatPrice(selected.price) : "—"}</span>
                  </div>
                )
              })}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-gray-900">Общая стоимость</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Выбрано {selectedCount} из {slots.filter(s => s.required).length} обязательных</p>
            </div>

            {warnings.length > 0 && (
              <div className="mb-6 space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">Проверка совместимости</h3>
                {warnings.map((w, i) => (
                  <div key={i} className={`flex items-start gap-2 text-sm p-3 rounded-lg ${
                    w.type === "error" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-800"
                  }`}>
                    {w.type === "error" ? <X className="h-4 w-4 mt-0.5 shrink-0" /> : <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />}
                    <span>{w.message}</span>
                  </div>
                ))}
              </div>
            )}

            <button onClick={handleAddAll} disabled={!canAddToCart} className="btn-primary w-full gap-2 mb-3">
              <ShoppingCart className="h-4 w-4" />
              Добавить всё в корзину
            </button>

            {!canAddToCart && (
              <p className="text-xs text-gray-400 text-center">
                {selectedCount < requiredCount
                  ? "Выберите все обязательные компоненты"
                  : "Устраните ошибки совместимости"}
              </p>
            )}

            {selectedCount > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 mt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Выбранные компоненты</h3>
                <div className="space-y-1.5">
                  {slots.filter(s => selection[s.key]).map(s => (
                    <div key={s.key} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 truncate mr-2">{selection[s.key]!.name}</span>
                      <button
                        onClick={() => {
                          setSelection((prev) => ({ ...prev, [s.key]: null }))
                          setActiveSlot(s.key)
                        }}
                        className="text-red-500 hover:text-red-700 shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
