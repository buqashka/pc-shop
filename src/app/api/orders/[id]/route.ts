import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const order = await prisma.order.update({
      where: { id: parseInt(params.id) },
      data: { status: body.status },
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка обновления заказа" }, { status: 500 })
  }
}
