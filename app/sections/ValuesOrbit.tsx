"use client";

import { motion } from "framer-motion";
import { Heart, Lightbulb, Users2, Shield, BookOpen, Star } from "lucide-react";
import { useEffect, useState } from "react";

const values = [
  {
    icon: Heart,
    title: "Respeto",
    desc: "Fomentamos la empatía y el trato digno hacia todos.",
    color: "from-blue-500 to-blue-300",
  },
  {
    icon: Shield,
    title: "Honestidad",
    desc: "Actuamos con transparencia y coherencia en todo momento.",
    color: "from-yellow-400 to-yellow-200",
  },
  {
    icon: Users2,
    title: "Solidaridad",
    desc: "Promovemos la colaboración y el apoyo mutuo en nuestra comunidad.",
    color: "from-blue-600 to-blue-400",
  },
  {
    icon: Star,
    title: "Disciplina",
    desc: "Impulsamos el esfuerzo constante y la responsabilidad personal.",
    color: "from-yellow-500 to-yellow-300",
  },
  {
    icon: BookOpen,
    title: "Responsabilidad",
    desc: "Asumimos con compromiso nuestras acciones y decisiones.",
    color: "from-blue-700 to-blue-400",
  },
  {
    icon: Lightbulb,
    title: "Creatividad",
    desc: "Motivamos la innovación y el pensamiento original en cada proyecto.",
    color: "from-yellow-400 to-yellow-200",
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

export default function Values() {
  const isMobile = useIsMobile();

  return (
    <section
      id="valores"
      className="relative py-24 bg-gradient-to-b from-white via-blue-50 to-blue-100 overflow-hidden"
    >
      {/* 🌤 Fondo institucional sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />

      {/* 🏫 Encabezado */}
      <div className="relative z-10 text-center mb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-4"
        >
          Nuestros <span className="text-yellow-500">Valores</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Principios que inspiran y fortalecen nuestra comunidad educativa.
        </motion.p>
      </div>

      {/* 💎 Cards de valores */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto px-6 place-items-center">
        {values.map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={!isMobile ? { scale: 1.06 } : {}}
            className={`group relative w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br ${color} shadow-lg border border-white/50 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300`}
          >
            {/* Icono en negro */}
            <Icon className="w-8 h-8 mb-2 text-black drop-shadow-sm transition-transform duration-500 group-hover:scale-110" />

            {/* Título en negro */}
            <h3 className="font-bold text-lg text-black">{title}</h3>

            {/* Descripción en gris oscuro */}
            <p
              className={`text-xs text-neutral-800 px-3 mt-2 leading-snug transition-all duration-500 ${
                isMobile
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 group-hover:opacity-100 group-hover:translate-y-1"
              }`}
            >
              {desc}
            </p>

            {/* Glow más ligero */}
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>
          </motion.div>
        ))}
      </div>


      {/* 📜 Frase institucional */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-16 text-center text-blue-800 font-semibold text-lg tracking-wide"
      >
        Colegio Cenit — Formando personas con valores y visión
      </motion.p>
    </section>
  );
}
