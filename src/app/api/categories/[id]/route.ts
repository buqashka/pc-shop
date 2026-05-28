import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.category.delete({ where: { id: parseInt(params.id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка удаления" }, { status: 500 })
  }
}
