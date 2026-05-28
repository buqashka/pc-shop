"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const Part3D = dynamic(() => import("./Part3D"), { ssr: false })

export default function PartViewer({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <div className="w-full h-[200px] sm:h-full sm:min-h-[400px]">
      <Suspense fallback={<>{children}</>}>
        <Part3D slug={slug} />
      </Suspense>
    </div>
  )
}
