import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const all = searchParams.get("all")
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
  }

  const where: any = {}
  if (all !== "true") {
    where.userId = parseInt((session.user as any).id)
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      items: { include: { product: { select: { name: true, slug: true, images: true } } } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(orders)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Корзина пуста" }, { status: 400 })
    }

    const session = await getServerSession(authOptions)
    let userId: number | null = null
    if (session?.user) {
      userId = parseInt((session.user as any).id)
    }

    const order = await prisma.order.create({
      data: {
        userId: userId || 1,
        status: "PENDING",
        total: parseFloat(body.total),
        shippingAddress: body.shippingAddress || {},
        paymentMethod: body.paymentMethod || "card",
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.price),
          })),
        },
      },
      include: { items: true },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка создания заказа" }, { status: 500 })
  }
}
