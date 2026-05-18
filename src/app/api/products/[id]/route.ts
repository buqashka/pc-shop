import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const data: any = { ...body }
    if (data.specs && typeof data.specs === "object") {
      data.specs = JSON.stringify(data.specs)
    }
    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data,
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка обновления" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: parseInt(params.id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка удаления" }, { status: 500 })
  }
}
