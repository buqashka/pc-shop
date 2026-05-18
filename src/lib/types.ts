export type CartItemWithProduct = {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    slug: string
    price: number
    images: string[]
    stock: number
  }
}

export type OrderWithItems = {
  id: number
  status: string
  total: number
  createdAt: Date
  items: {
    id: number
    quantity: number
    price: number
    product: {
      name: string
      slug: string
      images: string[]
    }
  }[]
}

export type ProductFilters = {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sort?: "price_asc" | "price_desc" | "name" | "newest"
  search?: string
  page?: number
}
