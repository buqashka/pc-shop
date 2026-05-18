import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(price)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function generateSlug(name: string): string {
  const translitMap: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
    ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
    н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
    ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  }
  const translit = name
    .toLowerCase()
    .split("")
    .map((c) => translitMap[c] || c)
    .join("")
  return translit
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getFirstImage(images: string): string {
  try {
    const parsed = JSON.parse(images)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed[0]
  } catch { /* empty */ }
  return images || ""
}

export function parseSpecs(specs: string | null): Record<string, string> {
  if (!specs) return {}
  try { return JSON.parse(specs) } catch { return {} }
}

export function parseAddress(address: string | null): Record<string, string> {
  if (!address) return {}
  try { return JSON.parse(address) } catch { return {} }
}

export function parseImages(images: string): string[] {
  try {
    const parsed = JSON.parse(images)
    if (Array.isArray(parsed)) return parsed
  } catch { /* empty */ }
  return images ? [images] : []
}

export const categorySlugs: Record<string, string> = {
  processory: "Процессоры",
  videokarty: "Видеокарты",
  "operativnaya-pamyat": "Оперативная память",
  "materinskie-platy": "Материнские платы",
  nakopiteli: "Накопители",
  "bloki-pitaniya": "Блоки питания",
  korpusa: "Корпуса",
  ohlazhdenie: "Охлаждение",
  monitory: "Мониторы",
  myshi: "Мыши",
  klaviatury: "Клавиатуры",
  kabeli: "Кабели и переходники",
  periferiya: "Периферия",
}
