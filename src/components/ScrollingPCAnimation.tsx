"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import PartViewer from "./PartViewer"

const sections = [
  {
    id: "cpu",
    title: "Процессоры",
    desc: "Intel Core Ultra и AMD Ryzen — до 24 ядер, 5.8 ГГц. Для игр, стримов и работы.",
    btn: "Выбрать процессор",
    href: "/catalog/processory",
    side: "left" as const,
    color: "#60a5fa",
    tag: "Современные технологии",
  },
  {
    id: "gpu",
    title: "Видеокарты",
    desc: "NVIDIA GeForce RTX 40 series и AMD Radeon RX 7000. DLSS 3.5, трассировка лучей.",
    btn: "Выбрать видеокарту",
    href: "/catalog/videokarty",
    side: "right" as const,
    color: "#ef4444",
    tag: "Игровая мощность",
  },
  {
    id: "ram",
    title: "Оперативная память",
    desc: "DDR5 до 8000MHz с RGB. Corsair Dominator, Kingston Fury. 16-64 ГБ.",
    btn: "Выбрать память",
    href: "/catalog/operativnaya-pamyat",
    side: "left" as const,
    color: "#a78bfa",
    tag: "Молниеносная скорость",
  },
  {
    id: "mb",
    title: "Материнские платы",
    desc: "ASUS ROG, MSI MEG, Gigabyte AORUS. PCIe 5.0, DDR5, WiFi 7.",
    btn: "Выбрать плату",
    href: "/catalog/materinskie-platy",
    side: "right" as const,
    color: "#22c55e",
    tag: "Надёжная основа",
  },
  {
    id: "cooler",
    title: "Охлаждение",
    desc: "СЖО 360мм с LCD и воздушные башни Noctua. Тишина и низкие температуры.",
    btn: "Выбрать охлаждение",
    href: "/catalog/ohlazhdenie",
    side: "left" as const,
    color: "#38bdf8",
    tag: "Бесшумная эффективность",
  },
  {
    id: "psu",
    title: "Блоки питания",
    desc: "be quiet! Dark Power и Corsair RMx. 80+ Platinum, полностью модульные.",
    btn: "Выбрать БП",
    href: "/catalog/bloki-pitaniya",
    side: "right" as const,
    color: "#f59e0b",
    tag: "Чистая энергия",
  },
  {
    id: "ssd",
    title: "Накопители",
    desc: "NVMe Samsung 990 PRO — чтение до 7450 МБ/с. 500 ГБ — 4 ТБ.",
    btn: "Выбрать накопитель",
    href: "/catalog/nakopiteli",
    side: "left" as const,
    color: "#c084fc",
    tag: "Гигабайты мгновенно",
  },
]

const animProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
}

function PartBox({ id, color, side }: { id: string; color: string; side: string }) {
  const isLeft = side === "left"

  if (id === "cpu") {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -400 : 400 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
        >
          <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${color}30, transparent)` }} />
          <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-zinc-300 to-zinc-500 shadow-2xl border border-zinc-400/50 overflow-hidden">
            <div className="absolute inset-10 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-300 border border-zinc-400/50 shadow-inner flex items-center justify-center">
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-zinc-50 to-zinc-200 border border-zinc-300/50 flex items-center justify-center">
                <span className="text-sm font-bold text-zinc-500 tracking-widest">INTEL</span>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-2xl border-2 border-amber-600/20" />
            <div className="absolute bottom-0 left-0 right-0 h-5 flex items-center justify-center gap-0.5">
              {Array.from({ length: 22 }).map((_, i) => (
                <div key={i} className="w-1 h-4 rounded-full bg-zinc-400" />
              ))}
            </div>
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />
        </motion.div>
      </div>
    )
  }

  if (id === "gpu") {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -400 : 400 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-72 h-64 sm:w-80 sm:h-72 lg:w-[28rem] lg:h-80"
        >
          <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${color}30, transparent)` }} />
          <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-red-950 to-red-900 shadow-2xl border border-red-700/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3/5 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-t-2xl border-b border-zinc-700/50">
              <div className="absolute inset-0 flex items-center justify-center gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg" style={{ boxShadow: `0 0 10px ${color}` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-zinc-900 to-zinc-800 p-4">
              <div className="h-full rounded-lg bg-zinc-900 border border-zinc-700/50 flex items-center justify-center">
                <span className="text-xs font-bold text-zinc-500 tracking-widest">GEFORCE RTX</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 h-1 rounded-full opacity-80" style={{ background: `linear-gradient(90deg, ${color}, transparent, ${color})` }} />
        </motion.div>
      </div>
    )
  }

  if (id === "ram") {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -400 : 400 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80"
        >
          <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${color}30, transparent)` }} />
          {[0, 1].map((i) => (
            <div key={i} className={`absolute top-0 w-28 sm:w-36 h-full rounded-2xl bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl border border-zinc-700/50 overflow-hidden ${i === 0 ? "left-0" : "right-0"}`} style={{ transform: `rotate(${i === 0 ? "-6deg" : "6deg"}) translateY(${i === 0 ? "-8px" : "8px"})` }}>
              <div className="absolute top-3 left-2 right-2 bottom-14 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/50">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div key={j} className="h-1 bg-zinc-700/50 mx-2 rounded-full" style={{ marginTop: j === 0 ? 10 : 3 }} />
                ))}
              </div>
              <div className="absolute top-0 left-2 right-2 h-2 rounded-t-lg opacity-80" style={{ background: `linear-gradient(90deg, ${color}, #a78bfa, ${color})`, boxShadow: `0 0 12px ${color}` }} />
              <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center gap-0.5">
                {Array.from({ length: 22 }).map((_, j) => (
                  <div key={j} className="w-0.5 h-7 rounded-full bg-zinc-600" />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }

  if (id === "mb") {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -400 : 400 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-72 h-64 sm:w-80 sm:h-72 lg:w-96 lg:h-80"
        >
          <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${color}30, transparent)` }} />
          <div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-green-950 to-green-900 shadow-2xl border border-green-800/50 overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-xl bg-zinc-900 border-2 border-zinc-700 shadow-inner flex items-center justify-center">
              <div className="w-20 h-20 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-0.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute top-2 left-2 right-2 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center gap-1 px-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex-1 h-5 rounded bg-zinc-700/50" />
              ))}
            </div>
            <div className="absolute top-1/4 right-4 w-7 h-20 flex flex-col gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex-1 rounded bg-zinc-800 border border-zinc-700/50" style={{ width: i % 2 === 0 ? "100%" : "55%" }} />
              ))}
            </div>
            <div className="absolute bottom-20 left-10 right-10 h-5 rounded bg-zinc-800 border border-zinc-700/50" />
            <div className="absolute bottom-12 left-16 right-16 h-4 rounded bg-zinc-800 border border-zinc-700/30" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-14 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center">
              <div className="w-10 h-10 rounded bg-zinc-800 border border-zinc-700/50" />
            </div>
          </div>
          <div className="absolute bottom-3 left-4 right-4 h-0.5 rounded-full opacity-60" style={{ background: `linear-gradient(90deg, ${color}, transparent, ${color})` }} />
        </motion.div>
      </div>
    )
  }

  if (id === "cooler") {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -400 : 400 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80"
        >
          <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${color}30, transparent)` }} />
          <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl border border-zinc-700/50 overflow-hidden">
            <div className="absolute inset-8 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center shadow-inner">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="absolute w-16 h-5 rounded-full bg-gradient-to-r from-zinc-700/80 to-zinc-800/80" style={{ transform: `rotate(${i * 51.4}deg) translateX(18px)`, transformOrigin: "center" }} />
              ))}
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
              </div>
            </div>
            <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-zinc-700 border border-zinc-600" />
            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-zinc-700 border border-zinc-600" />
            <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-zinc-700 border border-zinc-600" />
            <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-zinc-700 border border-zinc-600" />
          </div>
        </motion.div>
      </div>
    )
  }

  if (id === "psu") {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -400 : 400 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-72 h-56 sm:w-80 sm:h-64 lg:w-96 lg:h-72"
        >
          <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${color}30, transparent)` }} />
          <div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-2xl border border-zinc-800/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3/5 flex items-center justify-center">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="absolute w-12 h-3 rounded-full bg-zinc-900" style={{ transform: `rotate(${i * 72}deg) translateX(14px)`, transformOrigin: "center" }} />
                  ))}
                  <div className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-zinc-950 to-zinc-900 border-t border-zinc-800/50 p-3">
              <div className="flex items-center justify-between px-4">
                <span className="text-xs font-bold text-zinc-500 tracking-wider">80+ PLATINUM</span>
                <span className="text-xs font-bold text-zinc-600">1200W</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (id === "ssd") {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-96">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -400 : 400 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-64 h-56 sm:w-72 sm:h-64 lg:w-80 lg:h-72"
        >
          <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${color}30, transparent)` }} />
          <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-violet-950 to-violet-900 shadow-2xl border border-violet-700/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3/5 bg-gradient-to-b from-violet-800 to-violet-950 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[10px] font-bold text-violet-300 tracking-widest">SAMSUNG</div>
                <div className="text-sm font-bold text-white mt-1">990 PRO</div>
                <div className="text-[8px] text-violet-400 mt-0.5">NVMe PCIe 4.0</div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2/5 p-3 flex gap-3 items-center justify-center">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-700/50 flex items-center justify-center">
                <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700/30" />
              </div>
              <div className="flex gap-1.5">
                {[0, 1].map((i) => (
                  <div key={i} className="w-10 h-12 rounded-lg bg-zinc-900 border border-zinc-700/50 flex items-center justify-center">
                    <div className="w-7 h-8 rounded bg-zinc-800 border border-zinc-700/30" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-5 rounded-r bg-zinc-800" />
          </div>
        </motion.div>
      </div>
    )
  }

  return null
}

function Section({ item }: { item: typeof sections[0] }) {
  const isLeft = item.side === "left"
  const orderText = isLeft ? "order-1 lg:order-2" : "order-1 lg:order-1"
  const orderPart = isLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"

  const glowPos = isLeft ? "left-1/3" : "right-1/3"

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 ${glowPos} -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] rounded-full blur-[80px] sm:blur-[100px] opacity-25`}
          style={{ backgroundColor: item.color }}
        />
      </div>

      <div className="relative z-10 h-full flex items-center px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 w-full h-full items-center">
          {/* Text side - always first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`${orderText} pt-8 lg:pt-0`}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-2 lg:mb-4 w-fit border"
              style={{
                backgroundColor: `${item.color}15`,
                color: item.color,
                borderColor: `${item.color}30`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
              {item.tag}
            </div>
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 lg:mb-4 leading-tight">
              {item.title}
            </h2>
            <p className="text-xs sm:text-lg text-gray-400 mb-3 lg:mb-8 leading-relaxed max-w-md">
              {item.desc}
            </p>
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 lg:px-6 lg:py-3.5 text-xs lg:text-sm font-semibold text-white transition-all w-fit hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: item.color,
                boxShadow: `0 4px 20px ${item.color}40`,
              }}
            >
              {item.btn}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="lg:w-4 lg:h-4">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

          {/* Part side - always second on mobile */}
          <motion.div
            initial={{ x: isLeft ? -400 : 400 }}
            whileInView={{ x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${orderPart} self-stretch`}
          >
            <PartViewer slug={item.id}>
              <PartBox id={item.id} color={item.color} side={item.side} />
            </PartViewer>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroSection() {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-primary-500/30 animate-pulse" style={{ animationDuration: "3s" }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-purple-500/20 animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-blue-500/20 animate-pulse" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-primary-400/15 animate-pulse" style={{ animationDuration: "3.5s", animationDelay: "2s" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.1" />
          <line x1="0" y1="40" x2="100" y2="40" stroke="white" strokeWidth="0.1" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="white" strokeWidth="0.1" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeWidth="0.1" />
          <line x1="20" y1="0" x2="20" y2="100" stroke="white" strokeWidth="0.1" />
          <line x1="40" y1="0" x2="40" y2="100" stroke="white" strokeWidth="0.1" />
          <line x1="60" y1="0" x2="60" y2="100" stroke="white" strokeWidth="0.1" />
          <line x1="80" y1="0" x2="80" y2="100" stroke="white" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-primary-400 text-sm font-medium tracking-widest uppercase mb-4"
          >
            Интернет-магазин комплектующих
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-4 tracking-tight leading-none"
          >
            Всё для
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent">
              твоего ПК
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-gray-400 text-base sm:text-lg mt-4"
          >
            Листай вниз — комплектующие вылетают
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500">Листай вниз</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-gray-500">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="2" />
            <motion.circle cx="8" cy="8" r="2" fill="currentColor" animate={{ cy: [8, 14, 8] }} transition={{ repeat: Infinity, duration: 2 }} />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export function ScrollingPCAnimation() {
  return (
    <>
      <HeroSection />
      {sections.map((item, idx) => (
        <Section key={item.id} item={item} />
      ))}
    </>
  )
}
