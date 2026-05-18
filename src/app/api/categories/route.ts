import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  })
  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const category = await prisma.category.create({
      data: { name: body.name, slug: body.slug, description: body.description },
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка создания категории" }, { status: 500 })
  }
}
