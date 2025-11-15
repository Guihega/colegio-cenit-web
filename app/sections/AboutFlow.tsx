"use client";

import { motion } from "framer-motion";
import { BookOpen, Users2, Star } from "lucide-react";

export default function About() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-blue-50/60 to-blue-100/40"
    >
      {/* 🌊 Ondas decorativas optimizadas */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute inset-x-0 top-0 w-full h-auto opacity-[0.25]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="waveGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FACC15" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ondas sin animación infinita costosa */}
        <path
          d="M0,160 C480,220 960,100 1440,200 L1440,320 L0,320 Z"
          fill="url(#waveBlue)"
        />
        <path
          d="M0,180 C480,240 960,120 1440,220 L1440,320 L0,320 Z"
          fill="url(#waveGold)"
        />
      </svg>

      {/* ✨ Luz ambiental optimizada */}
      <div className="absolute top-1/3 left-1/2 w-[450px] h-[450px] bg-yellow-200/10 rounded-full blur-[95px] -translate-x-1/2 pointer-events-none" />

      {/* 🏫 Contenido */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-blue-950"
        >
          Nuestra <span className="text-yellow-500">Esencia Educativa</span>
        </motion.h2>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center text-gray-700 text-lg leading-relaxed mb-16"
        >
          En el <strong>Colegio Educativo Cenit</strong>, formamos mentes críticas y
          corazones empáticos. Nuestra misión es unir el conocimiento, los valores
          y la innovación para construir un futuro responsable y humano.
        </motion.p>

        {/* 📘 Bloques institucionales — Optimización total */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: BookOpen,
              title: "Misión",
              text: "Brindar educación integral que fomente el desarrollo intelectual, emocional y social de nuestros estudiantes, guiándolos hacia el éxito con valores humanos.",
            },
            {
              icon: Users2,
              title: "Visión",
              text: "Ser una institución reconocida por su excelencia académica, innovación pedagógica y la formación de líderes éticos con conciencia global.",
            },
            {
              icon: Star,
              title: "Valores",
              text: "Respeto, honestidad, solidaridad, disciplina y amor al conocimiento — pilares que orientan cada paso de nuestra comunidad educativa.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group bg-white/95 p-8 rounded-3xl shadow-lg hover:shadow-xl border border-blue-100 transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center">
                <Icon className="w-14 h-14 text-blue-700 mb-4 group-hover:text-yellow-500 transition-colors duration-300" />
                <h3 className="text-2xl font-semibold mb-2 text-blue-900 group-hover:text-yellow-500 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {text}
                </p>
              </div>

              <div className="mt-4 w-0 group-hover:w-2/3 mx-auto h-[3px] bg-gradient-to-r from-yellow-400 to-blue-700 rounded-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mt-20"
        >
          <a
            href="#valores"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-semibold px-10 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-500"
          >
            Conoce Nuestros Valores
          </a>
        </motion.div>
      </div>
    </section>
  );
}
