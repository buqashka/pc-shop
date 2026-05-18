import { prisma } from "@/lib/prisma"
import { getFirstImage, parseSpecs } from "@/lib/utils"
import { CatalogClient } from "../CatalogClient"

export const dynamic = "force-dynamic"

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { brand?: string; minPrice?: string; maxPrice?: string; sort?: string; page?: string }
}) {
  const category = await prisma.category.findUnique({ where: { slug: params.category } })
  if (!category) return <div className="text-center py-20 text-gray-500">Категория не найдена</div>

  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ])

  const where: any = { isActive: true, categoryId: category.id }

  if (searchParams.brand) {
    const brand = await prisma.brand.findUnique({ where: { slug: searchParams.brand } })
    if (brand) where.brandId = brand.id
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {}
    if (searchParams.minPrice) where.price.gte = parseFloat(searchParams.minPrice)
    if (searchParams.maxPrice) where.price.lte = parseFloat(searchParams.maxPrice)
  }

  const orderBy: any = (() => {
    switch (searchParams.sort) {
      case "price_asc": return { price: "asc" as const }
      case "price_desc": return { price: "desc" as const }
      case "name": return { name: "asc" as const }
      default: return { createdAt: "desc" as const }
    }
  })()

  const page = parseInt(searchParams.page || "1")
  const perPage = 12
  const skip = (page - 1) * perPage

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: perPage,
      include: { brand: true, category: true },
    }),
    prisma.product.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)

  return (
    <CatalogClient
      categories={categories}
      brands={brands}
      products={products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
        image: getFirstImage(p.images),
        stock: p.stock,
        specs: parseSpecs(p.specs),
        brandName: p.brand.name,
        categorySlug: p.category.slug,
      }))}
      total={total}
      totalPages={totalPages}
      currentPage={page}
      currentCategory={params.category}
    />
  )
}
