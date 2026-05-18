import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const cpuCat = await prisma.category.create({ data: { name: "Процессоры", slug: "processory", description: "Центральные процессоры Intel и AMD" } })
  const gpuCat = await prisma.category.create({ data: { name: "Видеокарты", slug: "videokarty", description: "Видеокарты NVIDIA и AMD" } })
  const ramCat = await prisma.category.create({ data: { name: "Оперативная память", slug: "operativnaya-pamyat", description: "Модули RAM DDR4 и DDR5" } })
  const mbCat = await prisma.category.create({ data: { name: "Материнские платы", slug: "materinskie-platy", description: "Материнские платы для Intel и AMD" } })
  const ssdCat = await prisma.category.create({ data: { name: "Накопители", slug: "nakopiteli", description: "SSD, HDD, NVMe" } })
  const psuCat = await prisma.category.create({ data: { name: "Блоки питания", slug: "bloki-pitaniya", description: "Блоки питания для ПК" } })
  const caseCat = await prisma.category.create({ data: { name: "Корпуса", slug: "korpusa", description: "Корпуса для ПК" } })
  const coolCat = await prisma.category.create({ data: { name: "Охлаждение", slug: "ohlazhdenie", description: "Кулеры и СЖО" } })
  const monCat = await prisma.category.create({ data: { name: "Мониторы", slug: "monitory", description: "Мониторы для ПК" } })
  const mouseCat = await prisma.category.create({ data: { name: "Мыши", slug: "myshi", description: "Компьютерные мыши" } })
  const keyCat = await prisma.category.create({ data: { name: "Клавиатуры", slug: "klaviatury", description: "Механические и мембранные клавиатуры" } })
  const cableCat = await prisma.category.create({ data: { name: "Кабели и переходники", slug: "kabeli", description: "Кабели, переходники, адаптеры" } })
  const periCat = await prisma.category.create({ data: { name: "Периферия", slug: "periferiya", description: "Коврики, наушники, веб-камеры, колонки" } })

  // Brands created sequentially so auto-increment IDs match hardcoded brandId values below
  await prisma.brand.create({ data: { name: "Intel", slug: "intel" } })
  await prisma.brand.create({ data: { name: "AMD", slug: "amd" } })
  await prisma.brand.create({ data: { name: "NVIDIA", slug: "nvidia" } })
  await prisma.brand.create({ data: { name: "Corsair", slug: "corsair" } })
  await prisma.brand.create({ data: { name: "Samsung", slug: "samsung" } })
  await prisma.brand.create({ data: { name: "Seagate", slug: "seagate" } })
  await prisma.brand.create({ data: { name: "be quiet!", slug: "be-quiet" } })
  await prisma.brand.create({ data: { name: "Noctua", slug: "noctua" } })
  await prisma.brand.create({ data: { name: "ASUS", slug: "asus" } })
  await prisma.brand.create({ data: { name: "MSI", slug: "msi" } })
  await prisma.brand.create({ data: { name: "Gigabyte", slug: "gigabyte" } })
  await prisma.brand.create({ data: { name: "Kingston", slug: "kingston" } })
  await prisma.brand.create({ data: { name: "Logitech", slug: "logitech" } })
  await prisma.brand.create({ data: { name: "Razer", slug: "razer" } })
  await prisma.brand.create({ data: { name: "LG", slug: "lg" } })
  await prisma.brand.create({ data: { name: "Dell", slug: "dell" } })
  await prisma.brand.create({ data: { name: "A4Tech", slug: "a4tech" } })
  await prisma.brand.create({ data: { name: "HyperX", slug: "hyperx" } })
  await prisma.brand.create({ data: { name: "SteelSeries", slug: "steelseries" } })

  const products = await Promise.all([
    // Процессоры
    prisma.product.create({ data: { name: "Intel Core i7-14700K", slug: "intel-core-i7-14700k", description: "20 ядер (8P + 12E), 28 потоков, до 5.6 ГГц, LGA1700, DDR5", price: 45990, oldPrice: 49990, stock: 15, images: '[]', specs: JSON.stringify({ cores: 20, threads: 28, baseClock: "3.4 ГГц", boostClock: "5.6 ГГц", socket: "LGA1700", tdp: "125W", memoryType: "DDR5-5600", brand: "Intel" }), categoryId: cpuCat.id, brandId: 1, isFeatured: true } }),
    prisma.product.create({ data: { name: "Intel Core i5-14600KF", slug: "intel-core-i5-14600kf", description: "14 ядер (6P + 8E), 20 потоков, до 5.3 ГГц, LGA1700", price: 28990, stock: 20, images: '[]', specs: JSON.stringify({ cores: 14, threads: 20, baseClock: "3.5 ГГц", boostClock: "5.3 ГГц", socket: "LGA1700", tdp: "125W", memoryType: "DDR5-5600", brand: "Intel" }), categoryId: cpuCat.id, brandId: 1, isFeatured: true } }),
    prisma.product.create({ data: { name: "AMD Ryzen 7 7800X3D", slug: "amd-ryzen-7-7800x3d", description: "8 ядер, 16 потоков, до 5.0 ГГц, AM5, 3D V-Cache", price: 42990, stock: 10, images: '[]', specs: JSON.stringify({ cores: 8, threads: 16, baseClock: "4.2 ГГц", boostClock: "5.0 ГГц", socket: "AM5", tdp: "120W", memoryType: "DDR5-5200", brand: "AMD" }), categoryId: cpuCat.id, brandId: 2, isFeatured: true } }),
    prisma.product.create({ data: { name: "AMD Ryzen 5 7600", slug: "amd-ryzen-5-7600", description: "6 ядер, 12 потоков, до 5.1 ГГц, AM5, DDR5", price: 21990, stock: 25, images: '[]', specs: JSON.stringify({ cores: 6, threads: 12, baseClock: "3.8 ГГц", boostClock: "5.1 ГГц", socket: "AM5", tdp: "65W", memoryType: "DDR5-5200", brand: "AMD" }), categoryId: cpuCat.id, brandId: 2 } }),
    // Видеокарты
    prisma.product.create({ data: { name: "NVIDIA GeForce RTX 4070 Ti Super", slug: "nvidia-rtx-4070-ti-super", description: "16GB GDDR6X, 256-bit, CUDA 8448, DLSS 3.5", price: 89990, oldPrice: 94990, stock: 8, images: '[]', specs: JSON.stringify({ memory: "16GB GDDR6X", memoryBus: "256-bit", cudaCores: 8448, boostClock: "2610 МГц", tdp: "285W", recommendedPsu: "700W", brand: "NVIDIA" }), categoryId: gpuCat.id, brandId: 3, isFeatured: true } }),
    prisma.product.create({ data: { name: "NVIDIA GeForce RTX 4060", slug: "nvidia-rtx-4060", description: "8GB GDDR6, 128-bit, CUDA 3072, DLSS 3", price: 37990, stock: 15, images: '[]', specs: JSON.stringify({ memory: "8GB GDDR6", memoryBus: "128-bit", cudaCores: 3072, boostClock: "2460 МГц", tdp: "115W", recommendedPsu: "550W", brand: "NVIDIA" }), categoryId: gpuCat.id, brandId: 3 } }),
    prisma.product.create({ data: { name: "AMD Radeon RX 7800 XT", slug: "amd-rx-7800xt", description: "16GB GDDR6, 256-bit, RDNA 3", price: 59990, stock: 12, images: '[]', specs: JSON.stringify({ memory: "16GB GDDR6", memoryBus: "256-bit", boostClock: "2430 МГц", tdp: "263W", recommendedPsu: "700W", brand: "AMD" }), categoryId: gpuCat.id, brandId: 2 } }),
    // ОЗУ
    prisma.product.create({ data: { name: "Corsair Vengeance DDR5 32GB (2x16GB)", slug: "corsair-vengeance-ddr5-32gb", description: "32GB (2x16GB) DDR5-6000MHz, CL30, XMP 3.0", price: 12990, oldPrice: 14990, stock: 30, images: '[]', specs: JSON.stringify({ capacity: "32GB (2x16GB)", type: "DDR5", frequency: "6000MHz", latency: "CL30", voltage: "1.35V", brand: "Corsair" }), categoryId: ramCat.id, brandId: 4, isFeatured: true } }),
    prisma.product.create({ data: { name: "Kingston Fury Beast DDR5 32GB (2x16GB)", slug: "kingston-fury-ddr5-32gb", description: "32GB (2x16GB) DDR5-5600MHz, CL36", price: 10990, stock: 25, images: '[]', specs: JSON.stringify({ capacity: "32GB (2x16GB)", type: "DDR5", frequency: "5600MHz", latency: "CL36", voltage: "1.25V", brand: "Kingston" }), categoryId: ramCat.id, brandId: 12 } }),
    prisma.product.create({ data: { name: "Corsair Vengeance DDR4 32GB (2x16GB)", slug: "corsair-vengeance-ddr4-32gb", description: "32GB (2x16GB) DDR4-3600MHz, CL18", price: 7990, stock: 20, images: '[]', specs: JSON.stringify({ capacity: "32GB (2x16GB)", type: "DDR4", frequency: "3600MHz", latency: "CL18", voltage: "1.35V", brand: "Corsair" }), categoryId: ramCat.id, brandId: 4 } }),
    // Матплаты
    prisma.product.create({ data: { name: "ASUS ROG STRIX Z790-E GAMING", slug: "asus-rog-strix-z790-e", description: "LGA1700, DDR5, PCIe 5.0, WiFi 6E, 20+1 VRM", price: 35990, stock: 7, images: '[]', specs: JSON.stringify({ socket: "LGA1700", formFactor: "ATX", memoryType: "DDR5", memorySlots: 4, pcieVersion: "5.0", wifi: "6E", brand: "ASUS" }), categoryId: mbCat.id, brandId: 9, isFeatured: true } }),
    prisma.product.create({ data: { name: "MSI MAG X670E TOMAHAWK", slug: "msi-mag-x670e-tomahawk", description: "AM5, DDR5, PCIe 5.0, WiFi 6E, 14+2 VRM", price: 31990, stock: 5, images: '[]', specs: JSON.stringify({ socket: "AM5", formFactor: "ATX", memoryType: "DDR5", memorySlots: 4, pcieVersion: "5.0", wifi: "6E", brand: "MSI" }), categoryId: mbCat.id, brandId: 10 } }),
    prisma.product.create({ data: { name: "Gigabyte B760M DS3H", slug: "gigabyte-b760m-ds3h", description: "LGA1700, DDR4/B5, mATX, PCIe 4.0", price: 12990, stock: 12, images: '[]', specs: JSON.stringify({ socket: "LGA1700", formFactor: "mATX", memoryType: "DDR5", memorySlots: 2, pcieVersion: "4.0", brand: "Gigabyte" }), categoryId: mbCat.id, brandId: 11 } }),
    // Накопители
    prisma.product.create({ data: { name: "Samsung 990 Pro 2TB NVMe", slug: "samsung-990-pro-2tb", description: "NVMe M.2 PCIe 4.0, чтение 7450MB/s, запись 6900MB/s", price: 19990, stock: 18, images: '[]', specs: JSON.stringify({ capacity: "2TB", type: "NVMe M.2", interface: "PCIe 4.0", readSpeed: "7450 MB/s", writeSpeed: "6900 MB/s", brand: "Samsung" }), categoryId: ssdCat.id, brandId: 5, isFeatured: true } }),
    prisma.product.create({ data: { name: "Samsung 870 EVO 1TB SATA", slug: "samsung-870-evo-1tb", description: "SATA III, чтение 560MB/s, запись 530MB/s", price: 8990, stock: 22, images: '[]', specs: JSON.stringify({ capacity: "1TB", type: "SATA III", readSpeed: "560 MB/s", writeSpeed: "530 MB/s", brand: "Samsung" }), categoryId: ssdCat.id, brandId: 5 } }),
    prisma.product.create({ data: { name: "Seagate Barracuda 2TB HDD", slug: "seagate-barracuda-2tb", description: "3.5\", 7200RPM, 256MB кэш", price: 5990, stock: 30, images: '[]', specs: JSON.stringify({ capacity: "2TB", type: "HDD 3.5\"", speed: "7200 RPM", cache: "256MB", brand: "Seagate" }), categoryId: ssdCat.id, brandId: 6 } }),
    // БП
    prisma.product.create({ data: { name: "be quiet! Dark Power 13 850W", slug: "be-quiet-dark-power-13-850w", description: "850W, 80+ Titanium, полностью модульный", price: 18990, stock: 8, images: '[]', specs: JSON.stringify({ power: "850W", certificate: "80+ Titanium", modular: "Полностью модульный", brand: "be quiet!" }), categoryId: psuCat.id, brandId: 7, isFeatured: true } }),
    prisma.product.create({ data: { name: "Corsair RM750e 750W", slug: "corsair-rm750e-750w", description: "750W, 80+ Gold, полностью модульный", price: 11990, stock: 15, images: '[]', specs: JSON.stringify({ power: "750W", certificate: "80+ Gold", modular: "Полностью модульный", brand: "Corsair" }), categoryId: psuCat.id, brandId: 4 } }),
    // Корпуса
    prisma.product.create({ data: { name: "Corsair 4000D Airflow", slug: "corsair-4000d-airflow", description: "Mid-Tower, стекло, отличная вентиляция", price: 9990, stock: 12, images: '[]', specs: JSON.stringify({ formFactor: "Mid-Tower", material: "Сталь + стекло", fanSupport: "10x120mm", psuLength: "220mm", brand: "Corsair" }), categoryId: caseCat.id, brandId: 4 } }),
    prisma.product.create({ data: { name: "be quiet! Silent Base 802", slug: "be-quiet-silent-base-802", description: "Mid-Tower, шумоизоляция, стекло", price: 13990, oldPrice: 15990, stock: 6, images: '[]', specs: JSON.stringify({ formFactor: "Mid-Tower", material: "Сталь + стекло", fanSupport: "3x140mm+2x120mm", brand: "be quiet!" }), categoryId: caseCat.id, brandId: 7 } }),
    // Охлаждение
    prisma.product.create({ data: { name: "Noctua NH-D15", slug: "noctua-nh-d15", description: "Двухбашенный суперкулер, 2x140mm, тихий", price: 12990, stock: 9, images: '[]', specs: JSON.stringify({ type: "Воздушный", tdp: "250W", fans: "2x140mm", height: "165mm", socket: "LGA1700/AM5", brand: "Noctua" }), categoryId: coolCat.id, brandId: 8, isFeatured: true } }),
    prisma.product.create({ data: { name: "Corsair H150i Elite Capellix", slug: "corsair-h150i-elite", description: "СЖО 360мм, RGB, LCD дисплей", price: 18990, stock: 5, images: '[]', specs: JSON.stringify({ type: "СЖО", size: "360mm", fans: "3x120mm RGB", socket: "LGA1700/AM5", brand: "Corsair" }), categoryId: coolCat.id, brandId: 4 } }),
    // Мониторы
    prisma.product.create({ data: { name: "LG 27GP850-B UltraGear", slug: "lg-27gp850-b", description: "27\", IPS, 2560x1440, 165Hz, G-Sync, HDR10", price: 35990, stock: 10, images: '[]', specs: JSON.stringify({ size: "27\"", resolution: "2560x1440", matrix: "IPS", refreshRate: "165 Гц", response: "1ms", brand: "LG" }), categoryId: monCat.id, brandId: 15, isFeatured: true } }),
    prisma.product.create({ data: { name: "Dell S2722QC", slug: "dell-s2722qc", description: "27\", IPS, 4K UHD, 60Hz, USB-C 65W", price: 31990, stock: 8, images: '[]', specs: JSON.stringify({ size: "27\"", resolution: "3840x2160", matrix: "IPS", refreshRate: "60 Гц", builtInSpeakers: "Да", brand: "Dell" }), categoryId: monCat.id, brandId: 16 } }),
    prisma.product.create({ data: { name: "MSI G2412", slug: "msi-g2412", description: "24\", IPS, 1920x1080, 170Hz, 1ms", price: 17990, stock: 15, images: '[]', specs: JSON.stringify({ size: "24\"", resolution: "1920x1080", matrix: "IPS", refreshRate: "170 Гц", response: "1ms", brand: "MSI" }), categoryId: monCat.id, brandId: 10 } }),
    // Мыши
    prisma.product.create({ data: { name: "Logitech G Pro X Superlight 2", slug: "logitech-g-pro-x-superlight-2", description: "Беспроводная, 60г, 32000 DPI, Hero 2", price: 16990, oldPrice: 18990, stock: 20, images: '[]', specs: JSON.stringify({ type: "Беспроводная", sensor: "Hero 2", dpi: "32000", weight: "60г", battery: "95 часов", brand: "Logitech" }), categoryId: mouseCat.id, brandId: 13, isFeatured: true } }),
    prisma.product.create({ data: { name: "Razer DeathAdder V3", slug: "razer-deathadder-v3", description: "Беспроводная, 63г, 30000 DPI, Focus Pro 30K", price: 14990, stock: 15, images: '[]', specs: JSON.stringify({ type: "Беспроводная", sensor: "Focus Pro 30K", dpi: "30000", weight: "63г", brand: "Razer" }), categoryId: mouseCat.id, brandId: 14 } }),
    prisma.product.create({ data: { name: "A4Tech Bloody A70", slug: "a4tech-bloody-a70", description: "Проводная, 3200 DPI, 8 кнопок, RGB", price: 2190, stock: 40, images: '[]', specs: JSON.stringify({ type: "Проводная", sensor: "Оптический", dpi: "3200", weight: "95г", brand: "A4Tech" }), categoryId: mouseCat.id, brandId: 17 } }),
    prisma.product.create({ data: { name: "SteelSeries Rival 5", slug: "steelseries-rival-5", description: "Проводная, 18000 DPI, 9 кнопок, RGB", price: 6990, stock: 18, images: '[]', specs: JSON.stringify({ type: "Проводная", sensor: "TrueMove Air", dpi: "18000", weight: "85г", brand: "SteelSeries" }), categoryId: mouseCat.id, brandId: 19 } }),
    // Клавиатуры
    prisma.product.create({ data: { name: "Razer BlackWidow V4 75%", slug: "razer-blackwidow-v4-75", description: "Механическая, 75%, Hot-swap, Orange Switch, RGB", price: 18990, stock: 10, images: '[]', specs: JSON.stringify({ type: "Механическая", layout: "75%", switches: "Razer Orange", backlight: "RGB", connection: "Проводная USB-C", brand: "Razer" }), categoryId: keyCat.id, brandId: 14, isFeatured: true } }),
    prisma.product.create({ data: { name: "Logitech G413 SE", slug: "logitech-g413-se", description: "Механическая, полноразмерная, Tactile Switch, алюминий", price: 8990, stock: 15, images: '[]', specs: JSON.stringify({ type: "Механическая", layout: "Полноразмерная", switches: "Logitech Tactile", backlight: "Белая", connection: "Проводная", brand: "Logitech" }), categoryId: keyCat.id, brandId: 13 } }),
    prisma.product.create({ data: { name: "HyperX Alloy Origins 60", slug: "hyperx-alloy-origins-60", description: "Механическая, 60%, HyperX Red, RGB", price: 9990, stock: 12, images: '[]', specs: JSON.stringify({ type: "Механическая", layout: "60%", switches: "HyperX Red", backlight: "RGB", connection: "USB-C", brand: "HyperX" }), categoryId: keyCat.id, brandId: 18 } }),
    prisma.product.create({ data: { name: "A4Tech Bloody B820R", slug: "a4tech-bloody-b820r", description: "Механическая, полноразмерная, Blue Switch, RGB", price: 4590, stock: 25, images: '[]', specs: JSON.stringify({ type: "Механическая", layout: "Полноразмерная", switches: "Blue", backlight: "RGB", connection: "Проводная", brand: "A4Tech" }), categoryId: keyCat.id, brandId: 17 } }),
    // Кабели
    prisma.product.create({ data: { name: "Кабель HDMI 2.1 2м", slug: "hdmi-2-1-2m", description: "48Gbps, 8K@60Hz, 4K@120Hz, HDR, eARC", price: 1290, stock: 50, images: '[]', specs: JSON.stringify({ type: "HDMI 2.1", length: "2м", bandwidth: "48 Гбит/с", resolution: "8K@60Гц, 4K@120Гц", brand: "Corsair" }), categoryId: cableCat.id, brandId: 4, isFeatured: true } }),
    prisma.product.create({ data: { name: "Кабель DisplayPort 1.4 1.8м", slug: "displayport-1-4-1-8m", description: "32.4Gbps, 8K@60Hz, HDR", price: 1590, stock: 30, images: '[]', specs: JSON.stringify({ type: "DisplayPort 1.4", length: "1.8м", bandwidth: "32.4 Гбит/с", resolution: "8K@60Гц", brand: "Corsair" }), categoryId: cableCat.id, brandId: 4 } }),
    prisma.product.create({ data: { name: "Кабель USB-C - USB-C 1м", slug: "usb-c-c-1m", description: "USB 3.2 Gen 2, 10Gbps, 100W зарядка", price: 990, stock: 40, images: '[]', specs: JSON.stringify({ type: "USB-C - USB-C", length: "1м", standard: "USB 3.2 Gen 2", speed: "10 Гбит/с", power: "100W", brand: "Samsung" }), categoryId: cableCat.id, brandId: 5 } }),
    prisma.product.create({ data: { name: "Кабель питания C13 1.8м", slug: "power-cable-c13-1-8m", description: "Кабель питания для ПК, C13-C14, 1.8м", price: 490, stock: 60, images: '[]', specs: JSON.stringify({ type: "Кабель питания C13", length: "1.8м", standard: "C13 - C14 10A", brand: "Corsair" }), categoryId: cableCat.id, brandId: 4 } }),
    prisma.product.create({ data: { name: "Удлинитель USB 3.0 3м", slug: "usb-3-0-extender-3m", description: "USB 3.0, 5Gbps, совместимость с 2.0", price: 690, stock: 35, images: '[]', specs: JSON.stringify({ type: "USB удлинитель", length: "3м", standard: "USB 3.0", speed: "5 Гбит/с", brand: "Corsair" }), categoryId: cableCat.id, brandId: 4 } }),
    // Периферия
    prisma.product.create({ data: { name: "Коврик Razer Goliathus XXL", slug: "razer-goliathus-xxl", description: "940x410x3мм, тканевый, нескользящий", price: 3990, stock: 25, images: '[]', specs: JSON.stringify({ type: "Коврик", size: "940x410x3мм", material: "Ткань", brand: "Razer" }), categoryId: periCat.id, brandId: 14 } }),
    prisma.product.create({ data: { name: "Наушники HyperX Cloud II", slug: "hyperx-cloud-ii", description: "7.1 Surround, 53mm, съемный микрофон", price: 8990, stock: 18, images: '[]', specs: JSON.stringify({ type: "Гарнитура", drivers: "53mm", frequency: "15-25000 Гц", microphone: "Съемный", connection: "USB/3.5mm", brand: "HyperX" }), categoryId: periCat.id, brandId: 18, isFeatured: true } }),
    prisma.product.create({ data: { name: "Веб-камера Logitech C920", slug: "logitech-c920", description: "1080p@30fps, автофокус, встроенный микрофон", price: 6990, oldPrice: 7990, stock: 12, images: '[]', specs: JSON.stringify({ type: "Веб-камера", resolution: "1080p@30fps", focus: "Автофокус", microphone: "Встроенный", connection: "USB-A", brand: "Logitech" }), categoryId: periCat.id, brandId: 13 } }),
    prisma.product.create({ data: { name: "Колонки Logitech Z313", slug: "logitech-z313", description: "2.1, 25W, сабвуфер, пульт управления", price: 4990, stock: 15, images: '[]', specs: JSON.stringify({ type: "2.1", power: "25W", connection: "3.5mm", subwoofer: "Да", brand: "Logitech" }), categoryId: periCat.id, brandId: 13 } }),
    prisma.product.create({ data: { name: "SteelSeries QcK Large", slug: "steelseries-qck-large", description: "Коврик 450x400x2мм, тканевый", price: 2490, stock: 30, images: '[]', specs: JSON.stringify({ type: "Коврик", size: "450x400x2мм", material: "Ткань", brand: "SteelSeries" }), categoryId: periCat.id, brandId: 19 } }),
  ])

  const adminPassword = await bcrypt.hash("admin123", 10)
  const userPassword = await bcrypt.hash("user123", 10)

  await prisma.user.create({ data: { email: "admin@pcshop.ru", password: adminPassword, name: "Администратор", role: "ADMIN" } })
  await prisma.user.create({ data: { email: "user@example.com", password: userPassword, name: "Иван Иванов", role: "USER" } })

  console.log("База успешно заполнена! Товаров:", products.length)
  console.log("Админ: admin@pcshop.ru / admin123")
  console.log("Пользователь: user@example.com / user123")
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
