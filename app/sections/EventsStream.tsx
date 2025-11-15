"use client";
import {
  useMemo,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  CalendarDays,
  Sparkles,
  Trophy,
  LayoutList,
  LayoutGrid,
  CalendarPlus,
  ArrowRight,
  X,
} from "lucide-react";

import React from "react";
// ======================================================
// 🎪 EVENTS — EXPERIENCIA OPTIMIZADA UX/UI 2025
// ======================================================

type EventItem = {
  id: string;
  title: string;
  dateISO: string;
  dateLabel: string;
  desc: string;
  category: "Académico" | "Ciencia" | "Cultural";
  icon: React.ReactNode
  color: string;
};

// 🎓 Datos institucionales
const ALL_EVENTS: EventItem[] = [
  {
    id: "ev-1",
    title: "Inicio del Ciclo Escolar 2025",
    dateISO: "2025-08-26T09:00:00",
    dateLabel: "26 de Agosto 2025 · 9:00 AM",
    desc: "Bienvenida institucional con metas claras y actividades de integración por grupos.",
    category: "Académico",
    icon: <CalendarDays className="w-5 h-5 text-yellow-400" />,
    color:
      "from-blue-100 to-blue-50 dark:from-slate-800 dark:to-slate-950",
  },
  {
    id: "ev-3",
    title: "Semana de la Ciencia",
    dateISO: "2025-10-10T08:30:00",
    dateLabel: "10–14 de Octubre 2025",
    desc: "Exposiciones y experimentos guiados por estudiantes de todos los grados.",
    category: "Ciencia",
    icon: <Sparkles className="w-5 h-5 text-pink-400" />,
    color:
      "from-pink-100 to-pink-50 dark:from-slate-800 dark:to-slate-950",
  },
  {
    id: "ev-4",
    title: "Festival de Día de Muertos",
    dateISO: "2025-10-31T17:00:00",
    dateLabel: "31 de Octubre 2025 · 5:00 PM",
    desc: "Altares, ofrendas y desfile de catrinas en homenaje a nuestras tradiciones.",
    category: "Cultural",
    icon: <Trophy className="w-5 h-5 text-purple-500" />,
    color:
      "from-purple-100 to-purple-50 dark:from-slate-800 dark:to-slate-950",
  },
  {
    id: "ev-6",
    title: "Festival Navideño Escolar",
    dateISO: "2025-12-15T10:00:00",
    dateLabel: "15 de Diciembre 2025 · 10:00 AM",
    desc: "Presentaciones artísticas, villancicos y convivencia familiar para cerrar el año.",
    category: "Cultural",
    icon: <Sparkles className="w-5 h-5 text-red-400" />,
    color:
      "from-red-100 to-red-50 dark:from-slate-800 dark:to-slate-950",
  },
];

const categories = ["Todos", "Académico", "Ciencia", "Cultural"] as const;
type CategoryFilter = (typeof categories)[number];
type ViewMode = "timeline" | "cards";

export default function EventsShowcase() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [cat, setCat] = useState<CategoryFilter>("Todos");
  const [view, setView] = useState<ViewMode>("cards");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const now = useMemo(() => new Date(), []);

  // 🎯 Filtro optimizado
  const filtered = useMemo(() => {
    const n = now.getTime();
    return ALL_EVENTS.filter((e) => {
      const eventDate = new Date(e.dateISO).getTime();
      const isUpcoming = eventDate >= n;
      const tabOk = tab === "upcoming" ? isUpcoming : !isUpcoming;
      const catOk = cat === "Todos" || e.category === cat;
      return tabOk && catOk;
    }).sort((a, b) => +new Date(a.dateISO) - +new Date(b.dateISO));
  }, [tab, cat, now]);

  // 🧠 Scroll Progress — optimizado con requestAnimationFrame
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const barEl = barRef.current;
    if (!sectionEl || !barEl) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = sectionEl.getBoundingClientRect();
          const height = sectionEl.scrollHeight - window.innerHeight;
          const scrolled = Math.min(Math.max(-rect.top, 0), height);
          const ratio = height > 0 ? scrolled / height : 0;
          barEl.style.transform = `scaleY(${ratio})`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎫 Helpers calendario
  const toGoogleCalendarURL = (ev: EventItem) => {
    const start = new Date(ev.dateISO);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const params = new URLSearchParams({
      text: ev.title,
      details: ev.desc,
      dates: `${fmt(start)}/${fmt(end)}`,
    });
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&${params}`;
  };

  const downloadICS = (ev: EventItem) => {
    const start = new Date(ev.dateISO);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cenit//Eventos//MX
BEGIN:VEVENT
UID:${ev.id}@cenit.edu
DTSTAMP:${fmt(new Date())}
DTSTART:${fmt(start)}
DTEND:${fmt(end)}
SUMMARY:${escapeICS(ev.title)}
DESCRIPTION:${escapeICS(ev.desc)}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], {
      type: "text/calendar;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${slugify(ev.title)}.ics`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // 🧩 Modal — cierre por teclado
  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setSelected(null);
  };

  const [selected, setSelected] = useState<EventItem | null>(null);

  return (
    <section
      ref={sectionRef}
      id="eventos"
      aria-labelledby="heading-events"
      className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
    >
      <div
        ref={barRef}
        id="scroll-progress-bar"
        className="absolute left-0 top-0 w-[3px] h-full bg-[var(--color-accent)] origin-top scale-y-0 transition-transform duration-75"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_70%)] animate-[gradientMove_20s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* 🔹 Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2
            id="heading-events"
            className="text-4xl md:text-5xl font-bold text-blue-950 dark:text-white mb-3"
          >
            Eventos y Actividades
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Descubre lo que viene y revive lo mejor de nuestras experiencias
            escolares.
          </p>
        </motion.div>

        {/* 🔸 Controles */}
        <div className="sticky top-4 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md p-3 flex flex-wrap items-center justify-between gap-3 mb-10 border border-slate-200 dark:border-slate-800">
          {/* Tabs */}
          <div className="flex gap-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-1">
            {[
              { key: "upcoming", label: "Próximos" },
              { key: "past", label: "Pasados" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  tab === t.key
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Categorías */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm border transition ${
                  cat === c
                    ? "bg-white dark:bg-slate-900 border-[var(--color-accent)] text-[var(--color-primary)]"
                    : "bg-transparent border-slate-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-slate-900/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Vista */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("timeline")}
              className={`p-2 rounded-lg border transition ${
                view === "timeline"
                  ? "border-[var(--color-accent)] text-[var(--color-primary)]"
                  : "border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-slate-900/70"
              }`}
              title="Vista timeline"
            >
              <LayoutList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("cards")}
              className={`p-2 rounded-lg border transition ${
                view === "cards"
                  ? "border-[var(--color-accent)] text-[var(--color-primary)]"
                  : "border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-slate-900/70"
              }`}
              title="Vista tarjetas"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 🧱 Contenido */}
        {filtered.length === 0 ? (
          <div className="text-center py-14 text-gray-600 dark:text-gray-400">
            No hay eventos en esta categoría.{" "}
            <span className="inline-flex items-center gap-1">
              Explora otras <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        ) : view === "timeline" ? (
          <TimelineList
            items={filtered}
            reduceMotion={reduceMotion}
            onICS={downloadICS}
            onGoogle={toGoogleCalendarURL}
          />
        ) : (
          <CardCalendar
            items={filtered}
            reduceMotion={reduceMotion}
            onICS={downloadICS}
            onGoogle={toGoogleCalendarURL}
            selected={selected}
            setSelected={setSelected}
            handleKey={handleKey}
          />
        )}
      </div>
    </section>
  );
}

// 🔧 Subcomponentes reusados (idénticos en props)
function TimelineList({
  items,
  reduceMotion,
  onICS,
  onGoogle,
}: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.18 } },
      }}
      className="relative border-l-4 border-blue-300 dark:border-blue-700 pl-8 space-y-8 sm:space-y-10"
    >
      {items.map((ev: EventItem, i: number) => (
        <motion.article
          key={ev.id}
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: i * 0.08,
            ease: "easeOut",
          }}
          whileHover={{
            scale: reduceMotion ? 1 : 1.02,
            x: reduceMotion ? 0 : 4,
          }}
          className={`relative ml-5 rounded-xl shadow-md hover:shadow-lg dark:shadow-blue-900/20 transition-all duration-500 p-5 sm:p-6 bg-gradient-to-b ${ev.color}`}
        >
          <div className="absolute -left-9 top-6 w-6 h-6 rounded-full bg-[var(--color-accent)] border-4 border-white dark:border-slate-800 shadow-md grid place-items-center">
            {ev.icon}
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--color-primary)] dark:text-white">
            {ev.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {ev.dateLabel}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            {ev.desc}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={onGoogle(ev)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition"
            >
              <CalendarPlus className="w-4 h-4" />
              Añadir a Google
            </a>
            <button
              onClick={() => onICS(ev)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-slate-900/50 transition"
            >
              <CalendarPlus className="w-4 h-4" />
              Descargar .ICS
            </button>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

// 🗂️ Cards grid + modal (optimizado)
function CardCalendar({
  items,
  reduceMotion,
  onICS,
  onGoogle,
  selected,
  setSelected,
  handleKey,
}: any) {
  return (
    <div
      className="relative w-full"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {items.map((ev: EventItem, i: number) => (
          <motion.article
            key={ev.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              delay: i * 0.05,
            }}
            onClick={() => setSelected(ev)}
            className={`group relative cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 bg-gradient-to-b ${ev.color} border border-slate-200 dark:border-slate-800 hover:border-[var(--color-accent)] min-h-[230px] flex flex-col justify-between`}
          >
            <div className="flex justify-between mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-primary)] dark:text-white leading-snug pr-3">
                {ev.title}
              </h3>
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="bg-white/70 dark:bg-slate-900/70 rounded-full p-2 border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm"
              >
                {ev.icon}
              </motion.div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
              {ev.dateLabel}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
              {ev.desc}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs px-2 py-1 rounded-md bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">
                {ev.category}
              </span>
              <span className="text-xs text-[var(--color-accent)] font-medium flex items-center gap-1">
                Ver más <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-lg w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white">
                  {selected.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-primary)] dark:text-white">
                    {selected.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selected.dateLabel}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                {selected.desc}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={onGoogle(selected)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Añadir a Google
                </a>
                <button
                  onClick={() => onICS(selected)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-slate-900/50 transition"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Descargar .ICS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 🔧 Utils
function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
function escapeICS(s: string) {
  return s.replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}
