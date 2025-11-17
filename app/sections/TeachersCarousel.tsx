"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookA, Users, Brain, Palette } from "lucide-react";
import { publicPath } from "@/app/lib/path";

// 🧠 Datos institucionales
const teachers = [
  { name: "Mtra. Laura Mendoza", role: "Dirección General", img: publicPath("/img/docentes/docente1.webp"), icon: Users },
  { name: "Profa. Sofía Ortega", role: "Educación Inicial", img: publicPath("/img/docentes/docente2.webp"), icon: BookA },
  { name: "Profr. Luis Navarro", role: "Coordinación Académica", img: publicPath("/img/docentes/docente3.webp"), icon: Brain },
  { name: "Mtra. Daniela Torres", role: "Lenguaje y Comunicación", img: publicPath("/img/docentes/docente4.webp"), icon: BookA },
  { name: "Profr. Mateo Rivera", role: "Educación Física", img: publicPath("/img/docentes/docente5.webp"), icon: Users },
  { name: "Mtra. Camila Luna", role: "Arte y Creatividad", img: publicPath("/img/docentes/docente6.webp"), icon: Palette },
];

// ✨ Variantes de animación
const containerVariants = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Teachers() {
  return (
    <section
      id="docentes"
      className="relative py-20 sm:py-24 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      {/* 🌤 Fondo suave institucional */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        {/* 🏫 Encabezado */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-950 mb-3"
        >
          Nuestro Equipo Educativo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Profesionales apasionados por enseñar, inspirar y guiar el desarrollo integral de cada estudiante.
        </motion.p>

        {/* 👩‍🏫 GRID Docentes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 place-items-center"
        >
          {teachers.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.article
                key={i}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  boxShadow: "0 8px 25px rgba(59,130,246,0.15)",
                }}
                className="group relative bg-white rounded-2xl shadow-md border border-blue-100 transition-all duration-500 w-full max-w-[270px] p-6 flex flex-col items-center text-center"
              >
                {/* 🖼️ Imagen circular */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-4 border-[var(--color-accent)] shadow-sm">
                  <Image
                    src={t.img}
                    alt={`Retrato de ${t.name}`}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={publicPath("/img/placeholder.webp")}
                    loading="lazy"
                  />
                </div>

                {/* 👩‍🏫 Nombre y rol */}
                <h3 className="text-lg font-semibold text-blue-900 mb-1">{t.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{t.role}</p>

                {/* ✨ Área / Icono */}
                <div className="flex items-center gap-2 justify-center text-[var(--color-accent)] font-medium text-sm">
                  <Icon className="w-4 h-4" />
                  Educación
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* 📜 Frase institucional */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 text-blue-800 font-semibold text-lg tracking-wide"
        >
          Instituto Horizonte — Inspirando mentes, construyendo futuro
        </motion.p>
      </div>
    </section>
  );
}
