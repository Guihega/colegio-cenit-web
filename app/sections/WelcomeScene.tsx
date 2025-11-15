"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

// ✅ Fondos precargados — Imágenes WebP comprimidas
const backgrounds = ["/img/hero1.webp", "/img/hero2.webp", "/img/hero3.webp"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // 🎞️ Cambio de fondo cada 10s con efecto suave
  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % backgrounds.length);
        setTransitioning(false);
      }, 800);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-blue-950 text-white"
    >
      {/* 🌌 Fondo dinámico con crossfade */}
      <div className="absolute inset-0">
        {backgrounds.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1.1 : 1,
            }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <Image
              src={src}
              alt={`Fondo ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={85}
              className="object-cover object-center will-change-transform"
            />
          </motion.div>
        ))}
      </div>

      {/* ✨ Degradado superior e inferior para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/30 to-transparent" />
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-950 via-blue-950/70 to-transparent" />

      {/* 🏫 Contenido principal */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        >
          Colegio Educativo{" "}
          <span className="text-yellow-400">Cenit</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-4 text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed"
        >
          Alcanzando el punto más alto del conocimiento y la formación humana.
        </motion.p>

        <motion.a
          href="#nosotros"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(250,204,21,0.4)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 220 }}
          className="inline-block mt-8 px-8 py-3 bg-yellow-400 text-blue-950 font-semibold rounded-full shadow-md hover:bg-yellow-300 transition-all duration-300"
        >
          Conócenos
        </motion.a>
      </div>

      {/* 🔽 Indicador de desplazamiento */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 text-center text-blue-100 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-wider mb-1">Desliza</span>
        <ChevronDown className="w-6 h-6 text-yellow-400" />
      </motion.div>

      {/* 🟡 Curva inferior */}
      <svg
        className="absolute bottom-0 w-full h-20 text-white"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,90.7C1120,85,1280,75,1360,69.3L1440,64V120H0Z"
        />
      </svg>
    </section>
  );
}
