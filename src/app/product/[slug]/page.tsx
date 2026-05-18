import { prisma } from "@/lib/prisma"
import { getFirstImage, parseImages, parseSpecs } from "@/lib/utils"
import { ProductDetail } from "./ProductDetail"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true, brand: true },
  })

  if (!product) notFound()

  const relatedProducts = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true },
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  })

  return (
    <ProductDetail
      product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: Number(product.price),
        oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
        stock: product.stock,
        images: parseImages(product.images),
        specs: parseSpecs(product.specs),
        category: product.category.name,
        brand: product.brand.name,
      }}
      relatedProducts={relatedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
        image: getFirstImage(p.images),
        stock: p.stock,
        specs: parseSpecs(p.specs),
        categorySlug: product.category.slug,
      }))}
    />
  )
}
