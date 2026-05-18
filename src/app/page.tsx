import { prisma } from "@/lib/prisma"
import { getFirstImage, parseSpecs } from "@/lib/utils"
import { ProductCard } from "@/components/ui/ProductCard"
import { ScrollingPCAnimation } from "@/components/ScrollingPCAnimation"
import { Truck, ShieldCheck, Package, Zap } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { brand: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  })

  const newProducts = await prisma.product.findMany({
    where: { isActive: true },
    include: { brand: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="bg-black">
      {/* Fullscreen scroll-driven PC disassembly */}
      <ScrollingPCAnimation />

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="border-t border-gray-800 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Хиты продаж</h2>
                <p className="text-sm text-gray-400 mt-1">Самые популярные товары</p>
              </div>
              <Link href="/catalog?sort=price_desc" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
                Все хиты &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  slug={p.slug}
                  price={Number(p.price)}
                  oldPrice={p.oldPrice ? Number(p.oldPrice) : null}
                  image={getFirstImage(p.images)}
                  stock={p.stock}
                  specs={parseSpecs(p.specs)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New products */}
      <section className="border-t border-gray-800 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Новинки</h2>
              <p className="text-sm text-gray-400 mt-1">Свежие поступления</p>
            </div>
            <Link href="/catalog?sort=newest" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
              Все новинки &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={Number(p.price)}
                oldPrice={p.oldPrice ? Number(p.oldPrice) : null}
                image={getFirstImage(p.images)}
                stock={p.stock}
                specs={parseSpecs(p.specs)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Builder CTA */}
      <section className="border-t border-gray-800 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary-900/50 via-primary-800/30 to-transparent border border-primary-800/30 p-8 sm:p-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-4">Собери свой ПК в конфигураторе</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Выбирай комплектующие — мы проверим совместимость. Процессор, видеокарта, память и всё остальное.
              </p>
              <div className="flex gap-3">
                <Link href="/builder" className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-4 text-base font-semibold text-white hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/25">
                  Собрать ПК
                </Link>
                <Link href="/catalog" className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-8 py-4 text-base font-semibold text-gray-200 hover:bg-gray-800 transition-all">
                  Каталог
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-gray-800 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Быстрая доставка", desc: "По всей России от 1 дня" },
              { icon: ShieldCheck, title: "Гарантия", desc: "Официальная до 3 лет" },
              { icon: Package, title: "Самовывоз", desc: "Более 100 пунктов выдачи" },
              { icon: Zap, title: "Сборка за час", desc: "Бесплатная сборка ПК" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-center hover:border-gray-700 transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600/10 text-primary-400 mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-100 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
