import Link from "next/link"
import { Package } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6 text-primary-400" />
              <span className="text-lg font-bold text-white">PC-Shop</span>
            </div>
            <p className="text-sm text-gray-400">
              Интернет-магазин компьютерных комплектующих. Широкий выбор, низкие цены, быстрая доставка.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Категории</h3>
            <ul className="space-y-2">
              {["Процессоры", "Видеокарты", "Оперативная память", "Материнские платы", "Накопители"].map((cat) => (
                <li key={cat}>
                  <Link href={`/catalog`} className="text-sm hover:text-primary-400 transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Покупателям</h3>
            <ul className="space-y-2">
              <li><Link href="/builder" className="text-sm hover:text-primary-400 transition-colors">Конфигуратор ПК</Link></li>
              <li><Link href="/cart" className="text-sm hover:text-primary-400 transition-colors">Корзина</Link></li>
              <li><Link href="/auth/login" className="text-sm hover:text-primary-400 transition-colors">Личный кабинет</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@pcshop.ru</li>
              <li>8 (800) 123-45-67</li>
              <li>г. Москва, ул. Компьютерная, д. 1</li>
              <li>Ежедневно: 10:00 - 21:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} PC-Shop. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
