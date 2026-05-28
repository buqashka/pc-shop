import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: { select: { name: true, slug: true } },
      brand: { select: { name: true } },
    },
  })

  const grouped: Record<string, any[]> = {}
  for (const p of products) {
    const catSlug = p.category.slug
    if (!grouped[catSlug]) grouped[catSlug] = []
    grouped[catSlug].push({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      stock: p.stock,
      specs: (() => { try { return JSON.parse(p.specs || "{}") } catch { return {} } })(),
      brandName: p.brand.name,
      categoryName: p.category.name,
    })
  }

  return NextResponse.json(grouped)
}

