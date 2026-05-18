import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const all = searchParams.get("all")
  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const search = searchParams.get("search")

  const where: any = {}
  if (all !== "true") where.isActive = true
  if (category) where.category = { slug: category }
  if (brand) where.brand = { slug: brand }
  if (search) {
    where.name = { contains: search }
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({
    products: products.map((p) => ({
      ...p,
      price: Number(p.price),
      oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
    })),
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: parseFloat(body.price),
        oldPrice: body.oldPrice ? parseFloat(body.oldPrice) : null,
        stock: parseInt(body.stock),
        categoryId: parseInt(body.categoryId),
        brandId: parseInt(body.brandId),
        specs: JSON.stringify(body.specs || {}),
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка создания товара" }, { status: 500 })
  }
}
