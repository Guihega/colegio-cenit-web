"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Inicio", href: "#inicio" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Valores", href: "#valores" },
  { name: "Docentes", href: "#docentes" },
  { name: "Eventos", href: "#eventos" },
  { name: "Contacto", href: "#contacto" },
];

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState("#inicio");
  const heroHeight = useRef(0);

  // 📏 Calcula altura del hero una vez
  useEffect(() => {
    heroHeight.current = window.innerHeight - 100;
  }, []);

  // 🧭 Control de visibilidad con requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const current = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(current > 70);
          if (current > 80 && current < heroHeight.current) setVisible(false);
          else if (current >= heroHeight.current || current <= 60)
            setVisible(true);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎯 ScrollSpy con IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // 🌀 Desplazamiento suave
  const smoothScroll = (targetId: string, offset = 120) => {
    const el = document.querySelector(targetId);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-[100] will-change-transform"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -120 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      {/* 🔹 Cinta superior */}
      <div
        className={`transition-all duration-500 text-sm ${
          scrolled
            ? "bg-blue-950/95 text-white backdrop-blur-md shadow-md border-b border-blue-900/40"
            : "bg-gradient-to-r from-blue-950/70 via-blue-900/70 to-blue-800/70 text-blue-100 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>+52 (238) 123 4567</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-400" />
              <span>contacto@colegiocenit.edu.mx</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>Tehuacán, Puebla</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button className="ml-2 p-1 hover:text-yellow-400 transition">
              <Sun className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 🔷 Navbar principal con fade dinámico */}
      <motion.nav
        initial={{ opacity: 0.95 }}
        animate={{
          backgroundColor: scrolled
            ? "rgba(30, 41, 59, 0.95)" // sólido al hacer scroll
            : "rgba(30, 41, 59, 0.6)", // translúcido sobre el hero
          backdropFilter: "blur(12px)",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "0 2px 10px rgba(0,0,0,0.05)",
          borderBottom: scrolled
            ? "1px solid rgba(30,58,138,0.4)"
            : "1px solid rgba(30,58,138,0)",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="transition-all duration-700 transform-gpu"
      >
        {/* ✨ Línea dorada animada */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
            scaleX: [0.95, 1, 0.95],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative z-10">
          {/* 🏫 Logo */}
          <button
            onClick={() => smoothScroll("#inicio")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-200 flex items-center justify-center shadow-md">
              <span className="text-blue-950 font-extrabold text-lg">C</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`font-bold text-xl md:text-2xl ${
                  scrolled ? "text-blue-50" : "text-white"
                }`}
              >
                Colegio
              </span>
              <span
                className={`font-semibold text-yellow-400 text-lg md:text-xl ${
                  scrolled ? "text-yellow-500" : "text-yellow-300"
                }`}
              >
                Cenit
              </span>
            </div>
          </button>

          {/* 💎 Menú escritorio */}
          <div className="hidden md:flex gap-8 font-medium items-center">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => smoothScroll(link.href)}
                className={`relative group ${
                  scrolled ? "text-blue-100" : "text-white"
                } ${
                  active === link.href
                    ? "text-yellow-400 font-semibold"
                    : "opacity-90"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-yellow-400 transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
            <button
              onClick={() => smoothScroll("#contacto")}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-semibold px-4 py-2 rounded-full shadow-sm transition-all"
            >
              Inscripciones
            </button>
          </div>

          {/* 📱 Botón móvil */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            className={`md:hidden p-2 rounded-lg transition ${
              scrolled
                ? "text-blue-100 hover:bg-blue-800/20"
                : "text-white hover:bg-blue-900/20"
            }`}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 📲 Menú móvil */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-blue-950/95 backdrop-blur-md shadow-lg border-t border-blue-900/40"
            >
              <div className="flex flex-col items-center gap-5 py-6 text-blue-100 font-medium">
                {links.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      smoothScroll(link.href, 100);
                      setOpen(false);
                    }}
                    className={`text-lg transition ${
                      active === link.href
                        ? "text-yellow-400 font-semibold"
                        : "hover:text-yellow-400"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    smoothScroll("#contacto", 100);
                    setOpen(false);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-semibold px-4 py-2 rounded-full shadow-sm transition-all"
                >
                  Inscripciones
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
